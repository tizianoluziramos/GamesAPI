import { Request, Response } from "express";
import GameRecommenderRepository from "../repositories/gamerecommender.repository";
import { Game } from "../models/gamerecommender.model";

class GameRecommenderController {
  constructor() {
    this.recommend = this.recommend.bind(this);
  }
  public postOnlyError(req: Request, res: Response): void {
    res.status(404).json({ error: "Use it by POST please :)" });
  }
  public async recommend(req: Request, res: Response) {
    const favoriteTitles: string[] = req.body.favoriteGames;

    if (!Array.isArray(favoriteTitles) || favoriteTitles.length === 0) {
      return res.status(400).json({ error: "Envía un array favoriteGames con títulos" });
    }

    const favoriteGames: Game[] = [];

    for (const title of favoriteTitles) {
      const game = await GameRecommenderRepository.findByTitle(title);
      if (game) favoriteGames.push(game);
    }

    if (favoriteGames.length === 0) {
      return res.status(404).json({ error: "No se encontraron juegos favoritos válidos" });
    }

    const allGames = await GameRecommenderRepository.getAllGames();

    // Vectores normalizados de todos los juegos (para usar mínimos y máximos reales)
    const allVectors = allGames.map((g) => [g.difficulty, g.popularity, g.duration]);
    const normalizedAllVectors = this.normalizeVector(allVectors);

    // Mapa para encontrar vector normalizado por título
    const gameVectorMap = new Map<string, number[]>();
    allGames.forEach((g, i) => gameVectorMap.set(g.title, normalizedAllVectors[i]));

    // Vectores normalizados de favoritos
    const favoriteVectors = favoriteGames.map((g) => gameVectorMap.get(g.title)!);

    // Promedio vector normalizado
    const avgVector = favoriteVectors[0].map((_, i) => favoriteVectors.reduce((sum, vec) => sum + vec[i], 0) / favoriteVectors.length);

    // Probabilidades género
    const genreCount: Record<string, number> = {};
    favoriteGames.forEach((g) => {
      genreCount[g.genre] = (genreCount[g.genre] || 0) + 1;
    });
    const total = favoriteGames.length;
    const genreProbability: Record<string, number> = {};
    for (const genre in genreCount) {
      genreProbability[genre] = genreCount[genre] / total;
    }

    // Pesos de atributos
    const weights = [0.5, 0.3, 0.2]; // dificultad, popularidad, duración
    const defaultGenreWeight = 0.2;

    let bestMatch: Game | null = null;
    let bestScore = -Infinity;

    for (const game of allGames) {
      if (favoriteTitles.includes(game.title)) continue;

      const gameVector = gameVectorMap.get(game.title)!;

      // Similaridad ponderada
      const similarity = this.weightedCosineSimilarity(avgVector, gameVector, weights);

      // Peso género (mejorado)
      const genreWeight = genreProbability[game.genre] ?? defaultGenreWeight;

      const score = similarity * genreWeight;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = game;
      }
    }

    if (!bestMatch) {
      return res.status(404).json({ error: "No hay recomendaciones disponibles" });
    }

    return res.json({ recommendation: bestMatch, similarityScore: bestScore });
  }

  // Normalización min-max
  private normalizeVector(vectors: number[][]): number[][] {
    const dims = vectors[0].length;
    const mins = Array(dims).fill(Infinity);
    const maxs = Array(dims).fill(-Infinity);

    for (const vec of vectors) {
      vec.forEach((val, i) => {
        if (val < mins[i]) mins[i] = val;
        if (val > maxs[i]) maxs[i] = val;
      });
    }

    return vectors.map((vec) => vec.map((val, i) => (maxs[i] === mins[i] ? 0 : (val - mins[i]) / (maxs[i] - mins[i]))));
  }

  private weightedCosineSimilarity(vecA: number[], vecB: number[], weights: number[]): number {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i] * weights[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a, i) => sum + (a * weights[i]) ** 2, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b, i) => sum + (b * weights[i]) ** 2, 0));
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  }
}

export default new GameRecommenderController();
