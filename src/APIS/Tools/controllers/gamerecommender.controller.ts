import { Request, Response } from "express";
import GameRecommenderRepository from "../repositories/gamerecommender.repository";
import { Game } from "../models/gamerecommender.model";

type ValidatedGame = Game & {
  id: number;
  title: string;
  genre: string;
  difficulty: number; // 0..10
  popularity: number; // 0..10
  duration: number; // hours
  description: string;
  releaseYear: number | null;
  platforms: string[];
  multiplayer: boolean;
  coop: boolean;
  openWorld: boolean;
  replayability: number; // 0..10
  tags: string[];
  mood: string | null;
  complexity: number; // 0..10
  similarGames?: number[] | null;
  metacriticScore?: number | null; // 0..100
  userScore?: number | null; // 0..10
  activePlayers?: number | null;
};

class GameRecommenderController {
  // simple in-memory cache to avoid recomputing features for every request
  // NOTE: For production-scale, migrate this cache to Redis with keys based on catalog hash/version.
  private static featuresCache: {
    ts: number;
    key: string | null;
    payload: {
      combinedVectors: number[][]; // NOT storing validatedGames to avoid duplicate memory
      combinedVectorsNorm?: number[][]; // L2-normalized vectors for fast dot product
      tfidfVocab?: string[];
      tfidf?: number[][];
      platformIndex?: Map<string, number>;
      genreIndex?: Map<string, number>;
      metaPopularity?: number[];
      recency?: number[];
      // metadata for cache validation (catalog size + maybe hash)
      meta?: { N: number; catalogHash?: string };
    } | null;
  } = { ts: 0, key: null, payload: null };

  constructor() {
    this.recommend = this.recommend.bind(this);
  }

  private logDebug(req: Request, favoriteTitles: string[]) {
    if (process.env.DEBUG !== "true") return;
    const ip = req.headers["x-forwarded-for"] || req.ip;
    const normalizedIp = Array.isArray(ip) ? ip[0] : ip;
    const displayIp = normalizedIp === "::1" ? "127.0.0.1" : normalizedIp;
    console.log("\x1b[32m[DEBUG]\x1b[0m " + "\x1b[33m" + req.method + "\x1b[0m " + "\x1b[36m/api/tools/gamerecommender\x1b[0m" + (favoriteTitles.length ? "?" + "\x1b[35m" + favoriteTitles.map((t) => `favoriteGames=${encodeURIComponent(t)}`).join("&") + "\x1b[0m" : "") + " " + "\x1b[90m" + JSON.stringify(favoriteTitles) + "\x1b[0m " + "\x1b[34m[IP:" + displayIp + "]\x1b[0m");
  }

  public async recommend(req: Request, res: Response) {
    try {
      // ------------ Parse + sanitize query inputs ------------
      const favoriteTitles = Array.isArray(req.query.favoriteGames) ? (req.query.favoriteGames as string[]) : typeof req.query.favoriteGames === "string" ? [req.query.favoriteGames] : [];

      this.logDebug(req, favoriteTitles);

      if (favoriteTitles.length === 0) {
        return res.status(400).json({ error: "Envía uno o más parámetros favoriteGames en la query string" });
      }

      // Optional filters/preferences from the client
      const requestedPlatform = typeof req.query.platform === "string" ? req.query.platform : null; // e.g. "PC"
      const requireMultiplayer = req.query.requireMultiplayer === "true";
      const diversity = typeof req.query.diversity === "string" ? Math.min(1, Math.max(0, parseFloat(req.query.diversity))) : 0.6; // 0..1
      const strictFilters = req.query.strictFilters === "true"; // if true, apply hard filters and don't relax

      // Allow overriding weights via query param `weights` (JSON string) - sanitize thoroughly
      const defaultW = {
        numeric: 0.2,
        tfidf: 0.3,
        genre: 0.08,
        tags: 0.12,
        mood: 0.05,
        platform: 0.05,
        multiplayer: 0.03,
        recency: 0.02,
        metaPopularity: 0.15,
      } as Record<string, number>;

      // create W from default, but only accept allowed keys
      const allowedWeightKeys = new Set(Object.keys(defaultW));
      let W: Record<string, number> = { ...defaultW };
      if (typeof req.query.weights === "string") {
        try {
          const parsed = JSON.parse(req.query.weights);
          if (parsed && typeof parsed === "object") {
            for (const k of Object.keys(parsed)) {
              if (!allowedWeightKeys.has(k)) continue; // whitelist only
              const v = Number(parsed[k]);
              if (!Number.isFinite(v)) continue;
              // clamp to reasonable range
              const clamped = Math.max(0, Math.min(10, v));
              W[k] = clamped;
            }
            // Optional: renormalize weights so they sum ~1 (helps interpretability)
            const sum = Object.keys(W).reduce((s, k) => s + (W[k] ?? 0), 0) || 1;
            Object.keys(W).forEach((k) => (W[k] = W[k] / sum));
          }
        } catch (e) {
          // ignore malformed weights - keep defaults
        }
      } else {
        // normalize default to sum 1
        const sum = Object.keys(W).reduce((s, k) => s + (W[k] ?? 0), 0) || 1;
        Object.keys(W).forEach((k) => (W[k] = W[k] / sum));
      }

      // ------------- Load and validate catalog -------------
      const rawGames = await GameRecommenderRepository.getAllGames();
      const validatedGames: ValidatedGame[] = [];
      const validationWarnings: string[] = [];

      for (const g of rawGames) {
        const validation = this.validateAndNormalizeGame(g);
        if (validation.valid) validatedGames.push(validation.game!);
        else validationWarnings.push(`Game id=${(g as any).id ?? "?"} title='${(g as any).title ?? "?"}' invalid: ${validation.reason}`);
      }

      if (!validatedGames.length) {
        return res.status(500).json({ error: "Catálogo inválido o vacío", details: validationWarnings.slice(0, 5) });
      }

      const N = validatedGames.length;

      // Build title->index map (case-insensitive lookup)
      const titleToIndex = new Map<string, number>();
      validatedGames.forEach((g, i) => titleToIndex.set(g.title.toLowerCase(), i));

      // Resolve favorites (dedupe + case-insensitive)
      const normalizedFavs = Array.from(new Set(favoriteTitles.map((t) => t.trim().toLowerCase())));
      const favoriteIndices: number[] = [];
      const notFound: string[] = [];
      for (const t of normalizedFavs) {
        const idx = titleToIndex.get(t);
        if (typeof idx === "number") favoriteIndices.push(idx);
        else notFound.push(t);
      }

      if (!favoriteIndices.length) {
        return res.status(404).json({ error: "No se encontraron juegos favoritos válidos", notFound });
      }

      // --------- Optional: use precomputed embeddings if repository exposes them and user asked for it ---------
      const wantPrecomputed = req.query.usePrecomputed === "true";

      // caching key: based on number of games + optional usePrecomputed flag and normalized weights (sorted)
      const sortedW = Object.keys(W)
        .sort()
        .map((k) => `${k}:${Number(W[k]).toFixed(6)}`)
        .join("|");
      const cacheKey = `${N}|pre:${wantPrecomputed ? 1 : 0}|w:${sortedW}`;
      const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes

      let combinedVectors: number[][] = [];
      let combinedVectorsNorm: number[][] = [];
      let metaPopularity: number[] = [];
      let recency: number[] = [];
      let platformIndex: Map<string, number> | undefined;
      let genreIndex: Map<string, number> | undefined;
      let tfidfVocab: string[] | undefined;
      let tfidfVectors: number[][] | undefined;

      // try to reuse cached features (NOTE: we don't cache validatedGames to avoid memory duplication)
      if (GameRecommenderController.featuresCache.key === cacheKey && Date.now() - GameRecommenderController.featuresCache.ts < CACHE_TTL_MS && GameRecommenderController.featuresCache.payload) {
        const p = GameRecommenderController.featuresCache.payload!;
        combinedVectors = p.combinedVectors;
        combinedVectorsNorm = p.combinedVectorsNorm ?? combinedVectors.map((v) => this.l2Normalize(v));
        metaPopularity = p.metaPopularity ?? [];
        recency = p.recency ?? [];
        platformIndex = p.platformIndex;
        genreIndex = p.genreIndex;
        tfidfVocab = p.tfidfVocab;
        tfidfVectors = p.tfidf;
      } else {
        // compute features (potentially expensive)

        // Numeric features matrix: difficulty, popularity, duration, replayability, complexity
        const numericMatrix = validatedGames.map((g) => [g.difficulty ?? 0, g.popularity ?? 0, g.duration ?? 0, g.replayability ?? 0, g.complexity ?? 0]);
        const normNumeric = this.minMaxNormalize(numericMatrix, /*equalValue=*/ 0.5);

        // Meta-popularity vector: combine and then normalize correctly (with Bayesian smoothing placeholder)
        const metaPopularityRaw = validatedGames.map((g) => {
          const mc = typeof g.metacriticScore === "number" ? g.metacriticScore / 100 : null;
          const us = typeof g.userScore === "number" ? g.userScore / 10 : null;
          const ap = typeof g.activePlayers === "number" ? Math.log1p(g.activePlayers) : null;
          const weights = { mc: 0.6, us: 0.3, ap: 0.1 };
          let sum = 0;
          let weightSum = 0;
          if (mc !== null) {
            sum += mc * weights.mc;
            weightSum += weights.mc;
          }
          if (us !== null) {
            sum += us * weights.us;
            weightSum += weights.us;
          }
          if (ap !== null) {
            sum += ap * weights.ap;
            weightSum += weights.ap;
          }
          if (weightSum === 0) return (g.popularity ?? 0) / 10;
          return sum / Math.max(1e-9, weightSum);
        });
        // min-max normalize (treat as column vector)
        metaPopularity = this.minMaxNormalize(
          metaPopularityRaw.map((v) => [v]),
          0.5
        ).map((r) => r[0]);

        // Genre one-hot
        const genres = Array.from(new Set(validatedGames.map((g) => g.genre)));
        genreIndex = new Map(genres.map((s, i) => [s, i]));
        const genreOneHot = validatedGames.map((g) => {
          const v = new Array(genres.length).fill(0);
          const gi = genreIndex!.get(g.genre)!;
          v[gi] = 1;
          return v;
        });

        // Tags vocabulary (lowercased)
        const allTags = Array.from(new Set(validatedGames.flatMap((g) => (g.tags || []).map((t) => t.toLowerCase()))));
        const tagIndex = new Map(allTags.map((t, i) => [t, i]));
        const tagVectors = validatedGames.map((g) => {
          const v = new Array(allTags.length).fill(0);
          for (const t of g.tags || []) {
            const ti = tagIndex.get(t.toLowerCase());
            if (typeof ti === "number") v[ti] += 1;
          }
          return this.l2Normalize(v);
        });

        // Mood embedding (small hand-crafted mapping)
        const moodVocab = ["relaxing", "creative", "competitive", "challenging", "epic", "introspective", "energetic", "moody", "silly", "adventurous", "tense", "nostalgic"];
        const moodIndex = new Map(moodVocab.map((m, i) => [m, i]));
        const moodVectors = validatedGames.map((g) => {
          const vec = new Array(moodVocab.length).fill(0);
          if (g.mood && moodIndex.has(g.mood)) {
            vec[moodIndex.get(g.mood)!] = 1;
          } else if (g.mood) {
            for (const [m, i] of moodIndex.entries()) {
              if (g.mood!.toLowerCase().includes(m)) vec[i] = 0.8;
            }
          }
          return this.l2Normalize(vec);
        });

        // TF-IDF or precomputed embeddings
        tfidfVectors = undefined;
        tfidfVocab = undefined;
        if (wantPrecomputed && typeof (GameRecommenderRepository as any).getPrecomputedEmbeddings === "function") {
          // repository may return embeddings aligned with validatedGames order
          const emb = await (GameRecommenderRepository as any).getPrecomputedEmbeddings();
          if (Array.isArray(emb) && emb.length === validatedGames.length) {
            tfidfVectors = emb.map((v: number[]) => this.l2Normalize(v.slice()));
          }
        }
        if (!tfidfVectors) {
          const descriptions = validatedGames.map((g) => g.description || "");
          const tfidfRes = this.buildTfidf(descriptions);
          tfidfVectors = tfidfRes.vectors;
          tfidfVocab = tfidfRes.vocab;
        }

        // Platform set
        const allPlatforms = Array.from(new Set(validatedGames.flatMap((g) => g.platforms.map((p) => p.toLowerCase()))));
        platformIndex = new Map(allPlatforms.map((p, i) => [p, i]));
        const platformVectors = validatedGames.map((g) => {
          const v = new Array(allPlatforms.length).fill(0);
          for (const p of g.platforms) {
            const pi = platformIndex!.get(p.toLowerCase());
            if (typeof pi === "number") v[pi] = 1;
          }
          return this.l2Normalize(v);
        });

        // Recency: exponential decay (newer -> higher). tau in years controls decay.
        const years = validatedGames.map((g) => (g.releaseYear && Number.isFinite(g.releaseYear) ? g.releaseYear : 1980));
        const maxYear = Math.max(...years);
        const tau = 3.0; // 3 years half-life-ish control; tuneable
        const recencyRaw = years.map((y) => Math.exp(-(maxYear - y) / tau));
        recency = this.minMaxNormalize(
          recencyRaw.map((v) => [v]),
          0.5
        ).map((r) => r[0]);

        // Platform/multiplayer preferences for user (binary feature)
        const userPlatformVec = requestedPlatform && platformIndex && platformIndex.has(requestedPlatform.toLowerCase()) ? platformVectors.map((_, i) => (validatedGames[i].platforms.map((p) => p.toLowerCase()).includes(requestedPlatform.toLowerCase()) ? 1 : 0)) : null; // if null, no platform preference

        // ------------- Build combined vectors -------------
        combinedVectors = validatedGames.map((_, i) => {
          const num = this.l2Normalize(normNumeric[i]);
          const txt = tfidfVectors![i]; // already normalized
          const gen = this.l2Normalize(genreOneHot[i]);
          const tag = tagVectors[i];
          const mood = moodVectors[i];
          const plat = platformVectors[i];
          const multiplayerFeat = [validatedGames[i].multiplayer ? 1 : 0, validatedGames[i].coop ? 1 : 0];
          const rec = [recency[i]];
          const metaPop = [metaPopularity[i]];

          return [...num.map((v) => v * W.numeric), ...txt.map((v) => v * W.tfidf), ...gen.map((v) => v * W.genre), ...tag.map((v) => v * W.tags), ...mood.map((v) => v * W.mood), ...plat.map((v) => v * W.platform), ...multiplayerFeat.map((v) => v * W.multiplayer), ...rec.map((v) => v * W.recency), ...metaPop.map((v) => v * W.metaPopularity)];
        });

        // precompute normalized combinedVectors for fast cosine (dot product)
        combinedVectorsNorm = combinedVectors.map((v) => this.l2Normalize(v));

        // cache the computed features (note: not storing validatedGames)
        GameRecommenderController.featuresCache = {
          ts: Date.now(),
          key: cacheKey,
          payload: {
            combinedVectors,
            combinedVectorsNorm,
            tfidfVocab,
            tfidf: tfidfVectors,
            platformIndex,
            genreIndex,
            metaPopularity,
            recency,
            meta: { N },
          },
        };
      }

      // -------------- Similarity / PageRank (scalable approach) --------------
      // Use ANN if available (repo may expose an ANN index or you can plug an external service)
      const TOPK_PER_FAV = 60; // tuneable

      // If repo exposes an ANN search API, we'll use it (contract: repo.searchAnn(vector, k) -> array of indices)
      const annAvailable = typeof (GameRecommenderRepository as any).searchAnn === "function" || (GameRecommenderController.featuresCache.payload && typeof (GameRecommenderController.featuresCache.payload as any).annSearch === "function");

      const topKSimilar = (aIdx: number, k: number, excludeSelf = true) => {
        // If ANN provided, prefer that (much faster for large N). If not, brute force.
        if (annAvailable) {
          try {
            // prefer repository-provided searchAnn
            if (typeof (GameRecommenderRepository as any).searchAnn === "function") {
              const qvec = combinedVectorsNorm[aIdx];
              // repository function expected to return [{ idx, score }] or index list
              const out = (GameRecommenderRepository as any).searchAnn(qvec, k + (excludeSelf ? 1 : 0));
              if (Array.isArray(out) && out.length) {
                // normalize output to indices
                const idxs: number[] = out.map((it: any) => (typeof it === "object" ? it.idx : it)).filter((n: any) => Number.isFinite(n));
                const filtered = excludeSelf ? idxs.filter((x) => x !== aIdx) : idxs;
                return filtered.slice(0, k);
              }
            }
            // fallback to custom annSearch in cache payload
            if (GameRecommenderController.featuresCache.payload && typeof (GameRecommenderController.featuresCache.payload as any).annSearch === "function") {
              const idxs = (GameRecommenderController.featuresCache.payload as any).annSearch(combinedVectorsNorm[aIdx], k + (excludeSelf ? 1 : 0));
              const filtered = excludeSelf ? idxs.filter((x: number) => x !== aIdx) : idxs;
              return filtered.slice(0, k);
            }
          } catch (e) {
            // If ANN call fails, fallback to brute force
            console.warn("ANN search failed, falling back to brute force:", e);
          }
        }

        // brute force O(N) fallback
        const sims: { idx: number; s: number }[] = [];
        for (let j = 0; j < (combinedVectorsNorm.length || 0); j++) {
          if (excludeSelf && j === aIdx) continue;
          // using normalized vectors -> dot product == cosine similarity
          const s = this.cosineSimilarity(combinedVectorsNorm[aIdx], combinedVectorsNorm[j]);
          sims.push({ idx: j, s });
        }
        sims.sort((x, y) => y.s - x.s);
        return sims.slice(0, k).map((x) => x.idx);
      };

      // union of indices: favorites + topK neighbors per favorite
      const graphIdxSet = new Set<number>(favoriteIndices);
      for (const fi of favoriteIndices) {
        const top = topKSimilar(fi, TOPK_PER_FAV, true);
        for (const t of top) graphIdxSet.add(t);
      }
      const graphIndices = Array.from(graphIdxSet);

      // Build small sim matrix among graphIndices
      const M = graphIndices.length;
      const smallSim: number[][] = Array.from({ length: M }, () => new Array(M).fill(0));
      for (let i = 0; i < M; i++) {
        for (let j = i; j < M; j++) {
          const s = this.cosineSimilarity(combinedVectorsNorm[graphIndices[i]], combinedVectorsNorm[graphIndices[j]]);
          smallSim[i][j] = s;
          smallSim[j][i] = s;
        }
      }

      // row-stochastic small transition (positive-only)
      const smallTransition = smallSim.map((row) => {
        const positiveRow = row.map((v) => Math.max(v, 0));
        const sum = positiveRow.reduce((a, b) => a + b, 0) + 1e-12;
        return positiveRow.map((v) => v / sum);
      });

      // teleport vector for small graph
      const smallTeleport = new Array(M).fill(0);
      const SEED_WEIGHT = 0.85;
      const PRIOR_WEIGHT = 0.15;

      // map favoriteIndices to positions in graphIndices
      const idxInGraph = new Map<number, number>();
      graphIndices.forEach((gi, i) => idxInGraph.set(gi, i));

      const seedCount = favoriteIndices.length;
      for (const si of favoriteIndices) {
        const pos = idxInGraph.get(si)!;
        if (typeof pos === "number") smallTeleport[pos] += SEED_WEIGHT / seedCount;
      }

      // priorScores limited to graph nodes: boost nodes that share genre/tags with favorites
      const favGenres = new Set(favoriteIndices.map((i) => validatedGames[i].genre));
      const favTagsSet = new Set(favoriteIndices.flatMap((i) => (validatedGames[i].tags || []).map((t) => t.toLowerCase())));
      const priorScoresSmall = graphIndices.map((gi) => {
        const g = validatedGames[gi];
        const genreBoost = favGenres.has(g.genre) ? 1 : 0;
        const tagOverlap = (g.tags || []).reduce((s, t) => s + (favTagsSet.has(t.toLowerCase()) ? 1 : 0), 0);
        return genreBoost + tagOverlap;
      });
      const priorSumSmall = priorScoresSmall.reduce((a, b) => a + b, 0) || 1;
      for (let i = 0; i < M; i++) smallTeleport[i] += (PRIOR_WEIGHT * priorScoresSmall[i]) / priorSumSmall;

      const smallPageRank = this.personalizedPageRank(smallTransition, smallTeleport, { damping: 0.85, maxIter: 300, tol: 1e-7 });

      // Map smallPageRank back to full space. For nodes not in the small graph, estimate pagerank as
      // the normalized average similarity to favorites (cheap O(F*N)) using pre-normalized vectors
      const pagerank = new Array(N).fill(0);
      // assign known
      for (let i = 0; i < M; i++) pagerank[graphIndices[i]] = smallPageRank[i];

      // For out-of-graph nodes, approximate by avg sim to favorites
      const favSimsCache = favoriteIndices.map((fi) => combinedVectorsNorm[fi]);
      for (let i = 0; i < N; i++) {
        if (graphIdxSet.has(i)) continue;
        let sumSim = 0;
        for (let f = 0; f < favoriteIndices.length; f++) {
          sumSim += this.cosineSimilarity(combinedVectorsNorm[i], favSimsCache[f]);
        }
        pagerank[i] = sumSim / Math.max(1, favoriteIndices.length);
      }

      // normalize pagerank
      const prSum = pagerank.reduce((a, b) => a + b, 0) || 1;
      for (let i = 0; i < N; i++) pagerank[i] = pagerank[i] / prSum;

      // ------------- Final scoring mixture -------------
      // Mix pagerank (semantic propagation), metaPopularity, and recency
      const ALPHA_PR = 0.6;
      const ALPHA_META = 0.3;
      const ALPHA_RECENCY = 0.1;

      if (!metaPopularity || !recency) {
        // fallback: simple defaults
        metaPopularity = new Array(N).fill(0);
        recency = new Array(N).fill(0);
      }
      const finalScores = pagerank.map((p, i) => ALPHA_PR * p + ALPHA_META * metaPopularity[i] + ALPHA_RECENCY * recency[i]);

      // ------------- Candidate filtering & penalties -------------
      let candidateIndices = validatedGames.map((g, i) => i);
      candidateIndices = candidateIndices.filter((i) => !favoriteIndices.includes(i));

      // Apply hard filters from user: but allow fallback if no candidates remain
      let filtersApplied = { platform: false, multiplayer: false };
      if (requestedPlatform) {
        filtersApplied.platform = true;
        candidateIndices = candidateIndices.filter((i) => validatedGames[i].platforms.map((p) => p.toLowerCase()).includes(requestedPlatform.toLowerCase()));
      }
      if (requireMultiplayer) {
        filtersApplied.multiplayer = true;
        candidateIndices = candidateIndices.filter((i) => validatedGames[i].multiplayer === true);
      }

      let relaxedFilters = false;
      if (!candidateIndices.length && (filtersApplied.platform || filtersApplied.multiplayer) && !strictFilters) {
        // relax filters and instead apply soft penalties
        relaxedFilters = true;
        candidateIndices = validatedGames.map((g, i) => i).filter((i) => !favoriteIndices.includes(i));
      }

      if (!candidateIndices.length) {
        return res.status(404).json({ error: "No hay candidatos después de aplicar filtros." });
      }

      // compute penalty multipliers array (safe checks)
      const platformLower = requestedPlatform ? requestedPlatform.toLowerCase() : null;
      const platformPenalty = (i: number) => (platformLower && validatedGames[i].platforms && !validatedGames[i].platforms.map((p) => p.toLowerCase()).includes(platformLower) ? 0.85 : 1.0);
      const multiplayerPenalty = (i: number) => (requireMultiplayer && !validatedGames[i].multiplayer ? 0.85 : 1.0);

      // ------------- Ranking & MMR re-rank -------------
      const scoredCandidates = candidateIndices.map((i) => ({ i, score: finalScores[i] * platformPenalty(i) * multiplayerPenalty(i) }));
      const ranked = scoredCandidates.sort((a, b) => b.score - a.score);

      // Keep top M for MMR
      const M_KEEP = Math.min(50, ranked.length);
      const topCandidates = ranked.slice(0, M_KEEP).map((r) => r.i);

      // MMR: lambda should be the relevance weight. We interpret `diversity` as (0..1) where higher = more diverse.
      // Use average similarity instead of max-sim (better tradeoff); make configurable later if needed.
      const lambdaMMR = 1 - diversity; // keep as relevance weight so that diversity param works intuitively
      const reranked = this.mmrRerank(topCandidates, combinedVectorsNorm.length ? combinedVectorsNorm : combinedVectors, finalScores, lambdaMMR, 5, { useAvgSim: true });

      const bestIdx = reranked.length ? reranked[0].i : ranked[0].i;
      const bestGame = validatedGames[bestIdx];

      // Build diagnostics: contributions breakdown for best item
      const diagnostics: any = {
        pagerankScore: pagerank[bestIdx],
        metaPopularity: metaPopularity[bestIdx],
        recency: recency[bestIdx],
        finalScore: finalScores[bestIdx],
        reasons: {
          genreMatch: favoriteIndices.some((fi) => validatedGames[fi].genre === bestGame.genre),
          tagOverlapCount: this.countTagOverlap(bestGame, favoriteIndices, validatedGames),
          platformMatch: requestedPlatform ? bestGame.platforms.map((p) => p.toLowerCase()).includes(requestedPlatform.toLowerCase()) : null,
          multiplayerMatch: requireMultiplayer ? bestGame.multiplayer : null,
          similarGamesHit: bestGame.similarGames?.filter((id) => validatedGames.some((g) => g.id === id)).length ?? 0,
        },
        rerankedTop5: reranked.map((r) => ({ title: validatedGames[r.i].title, score: r.score })),
        warnings: validationWarnings.slice(0, 10),
        relaxedFilters,
        cacheKey,
      };

      if (relaxedFilters) diagnostics.filterWarning = "Se relajaron filtros (platform/multiplayer) porque no había candidatos; se aplicó penalización suave en su lugar.";

      // Note: in production, strip sensitive diagnostics or gate behind an admin flag.
      return res.json({ recommendation: bestGame, diagnostics });
    } catch (err) {
      console.error("💥 Error en recommend ultra-advanced:", err);
      return res.status(500).json({ error: "Internal Server Error", details: (err as Error).message });
    }
  }

  // ------------------ Utility / Helpers ------------------

  private validateAndNormalizeGame(raw: any): { valid: boolean; reason?: string; game?: ValidatedGame } {
    if (!raw || typeof raw !== "object") return { valid: false, reason: "Not an object" };
    const id = Number(raw.id);
    const title = typeof raw.title === "string" ? raw.title.trim() : null;
    if (!title) return { valid: false, reason: "Missing or invalid title" };
    const genre = typeof raw.genre === "string" ? raw.genre.trim() : "Unknown";
    const difficulty = Number(raw.difficulty ?? 0);
    const popularity = Number(raw.popularity ?? 0);
    const duration = Number(raw.duration ?? 0);
    const description = typeof raw.description === "string" ? raw.description.trim() : "";

    if (!Number.isFinite(difficulty) || difficulty < 0 || difficulty > 10) return { valid: false, reason: "difficulty out of range 0..10" };
    if (!Number.isFinite(popularity) || popularity < 0 || popularity > 10) return { valid: false, reason: "popularity out of range 0..10" };
    if (!Number.isFinite(duration) || duration < 0) return { valid: false, reason: "duration invalid" };

    const releaseYear = raw.releaseYear && Number.isFinite(raw.releaseYear) ? Number(raw.releaseYear) : null;
    const platforms = Array.isArray(raw.platforms) ? raw.platforms.map((p: any) => String(p)) : [];
    const multiplayer = typeof raw.multiplayer === "boolean" ? raw.multiplayer : false;
    const coop = typeof raw.coop === "boolean" ? raw.coop : false;
    const openWorld = typeof raw.openWorld === "boolean" ? raw.openWorld : false;
    const replayability = Number.isFinite(Number(raw.replayability)) ? Math.max(0, Math.min(10, Number(raw.replayability))) : Math.min(10, Math.max(0, Math.round((duration / 50) * 5)));
    const tags = Array.isArray(raw.tags) ? raw.tags.map((t: any) => String(t)) : [];
    const mood = typeof raw.mood === "string" ? raw.mood.toLowerCase() : null;
    const complexity = Number.isFinite(Number(raw.complexity)) ? Math.max(0, Math.min(10, Number(raw.complexity))) : Math.round(difficulty);
    const metacriticScore = raw.metacriticScore == null ? null : Number(raw.metacriticScore);
    const userScore = raw.userScore == null ? null : Number(raw.userScore);
    const activePlayers = raw.activePlayers == null ? null : Number(raw.activePlayers);
    const similarGames = Array.isArray(raw.similarGames) ? raw.similarGames.map((x: any) => Number(x)).filter((n: any) => Number.isFinite(n)) : [];

    const game: ValidatedGame = {
      id,
      title,
      genre,
      difficulty,
      popularity,
      duration,
      description,
      releaseYear,
      platforms,
      multiplayer,
      coop,
      openWorld,
      replayability,
      tags,
      mood,
      complexity,
      similarGames,
      metacriticScore,
      userScore,
      activePlayers,
    };
    return { valid: true, game };
  }

  /**
   * minMaxNormalize
   * - vectors: array of rows (each row is a vector)
   * - equalValue: value to return when max === min for a dimension (default 0.5)
   */
  private minMaxNormalize(vectors: number[][], equalValue = 0.5): number[][] {
    if (!vectors.length) return vectors;
    const dims = vectors[0].length;
    const mins = new Array(dims).fill(Infinity);
    const maxs = new Array(dims).fill(-Infinity);
    for (const vec of vectors) {
      for (let i = 0; i < dims; i++) {
        if (vec[i] < mins[i]) mins[i] = vec[i];
        if (vec[i] > maxs[i]) maxs[i] = vec[i];
      }
    }
    return vectors.map((vec) =>
      vec.map((val, i) => {
        if (maxs[i] === mins[i]) return equalValue;
        return (val - mins[i]) / (maxs[i] - mins[i]);
      })
    );
  }

  private l2Normalize(vec: number[]): number[] {
    const mag = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1e-12;
    return vec.map((v) => v / mag);
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    // safe dot using minLen, but prefer using pre-normalized vectors (dot product)
    const minLen = Math.min(a.length, b.length);
    let dot = 0;
    let na = 0;
    let nb = 0;
    for (let i = 0; i < minLen; i++) {
      dot += a[i] * b[i];
      na += a[i] * a[i];
      nb += b[i] * b[i];
    }
    for (let i = minLen; i < a.length; i++) na += a[i] * a[i];
    for (let i = minLen; i < b.length; i++) nb += b[i] * b[i];
    const denom = Math.sqrt(na) * Math.sqrt(nb) || 1e-12;
    return dot / denom;
  }

  /**
   * buildTfidf
   * returns { vectors, vocab }
   * uses single tokenization helper and consistent lowercasing
   */
  private buildTfidf(corpus: string[]): { vectors: number[][]; vocab: string[] } {
    const tokenize = (s: string) =>
      String(s || "")
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean);
    const docs = corpus.map((c) => tokenize(c));
    const df = new Map<string, number>();
    docs.forEach((tokens) => {
      const seen = new Set<string>();
      tokens.forEach((t) => {
        if (!seen.has(t)) {
          df.set(t, (df.get(t) || 0) + 1);
          seen.add(t);
        }
      });
    });
    const vocab = Array.from(df.keys()).sort();
    const idf = vocab.map((w) => Math.log((1 + corpus.length) / (1 + (df.get(w) || 0))) + 1);
    const vectors = docs.map((tokens) => {
      const tf = new Map<string, number>();
      tokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
      const vec = vocab.map((w, idx) => ((tf.get(w) || 0) / (tokens.length || 1)) * idf[idx]);
      return this.l2Normalize(vec);
    });
    return { vectors, vocab };
  }

  /**
   * Personalized PageRank
   */
  private personalizedPageRank(transition: number[][], teleport: number[], opts?: { damping?: number; maxIter?: number; tol?: number }) {
    const damping = opts?.damping ?? 0.85;
    const maxIter = opts?.maxIter ?? 100;
    const tol = opts?.tol ?? 1e-6;
    const N = transition.length;
    const tSum = teleport.reduce((a, b) => a + b, 0) || 1;
    const tvec = teleport.map((v) => v / tSum);
    let pr = new Array(N).fill(1 / N);
    for (let it = 0; it < maxIter; it++) {
      const next = new Array(N).fill(0);
      for (let i = 0; i < N; i++) {
        const row = transition[i];
        const pi = pr[i];
        for (let j = 0; j < N; j++) {
          next[j] += damping * pi * row[j];
        }
      }
      for (let j = 0; j < N; j++) {
        next[j] += (1 - damping) * tvec[j];
      }
      const diff = next.reduce((s, v, i) => s + Math.abs(v - pr[i]), 0);
      pr = next;
      if (diff < tol) break;
    }
    const sum = pr.reduce((a, b) => a + b, 0) || 1;
    return pr.map((v) => v / sum);
  }

  /**
   * MMR re-rank
   * - supports option useAvgSim: use average similarity to selected set instead of max similarity
   */
  private mmrRerank(candidates: number[], vectors: number[][], scores: number[], lambda = 0.7, topK = 5, opts?: { useAvgSim?: boolean }) {
    const selected: { i: number; score: number }[] = [];
    const candSet = new Set(candidates);
    const simCache = new Map<string, number>();
    const sim = (a: number, b: number) => {
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (simCache.has(key)) return simCache.get(key)!;
      const s = this.cosineSimilarity(vectors[a], vectors[b]);
      simCache.set(key, s);
      return s;
    };
    while (selected.length < topK && candSet.size > 0) {
      let best: number | null = null;
      let bestVal = -Infinity;
      for (const c of Array.from(candSet)) {
        const relevance = scores[c];
        let diversityPenalty = 0;
        if (selected.length) {
          const sims = selected.map((s) => sim(c, s.i));
          diversityPenalty = opts?.useAvgSim ? sims.reduce((a, b) => a + b, 0) / sims.length : Math.max(...sims);
        }
        const mmrScore = lambda * relevance - (1 - lambda) * diversityPenalty;
        if (mmrScore > bestVal) {
          bestVal = mmrScore;
          best = c;
        }
      }
      if (best === null) break;
      selected.push({ i: best, score: bestVal });
      candSet.delete(best);
    }
    return selected;
  }

  private countTagOverlap(game: ValidatedGame, favoriteIndices: number[], allGames: ValidatedGame[]) {
    const favTags = new Set(favoriteIndices.flatMap((i) => allGames[i].tags.map((t) => t.toLowerCase())));
    return (game.tags || []).reduce((s, t) => s + (favTags.has(t.toLowerCase()) ? 1 : 0), 0);
  }
}

export default new GameRecommenderController();
