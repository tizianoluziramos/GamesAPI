import { Router } from "express";

// --- Controllers ---
import assetsController from "controllers/Papers Please/assets.controller";
import charactersController from "controllers/Papers Please/characters.controller";
import CountriesController from "controllers/Papers Please/countries.controller";
import creditsController from "controllers/Papers Please/credits.controller";
import { FinalesController } from "controllers/Papers Please/endings.controller";
import LoreController from "controllers/Papers Please/lore.controller";
import MecanicasController from "controllers/Papers Please/mechanics.controller";
import onlineStatsController from "controllers/Papers Please/online_stats.controller";
import recordController from "controllers/Papers Please/record.controller";
import theMovieController from "controllers/Papers Please/TheMovie.controller";
import shopController from "controllers/Papers Please/shops.controller";

const PapersPlease = Router();

PapersPlease.get("/characters/", charactersController.getAvailableLanguages);
PapersPlease.get("/characters/all", charactersController.getAllLanguagesData);
PapersPlease.get("/characters/:lang", charactersController.getPersonajes);
PapersPlease.get("/characters/:lang/id/:id", charactersController.getById);
PapersPlease.get("/characters/:lang/name/:name", charactersController.getByName);
PapersPlease.get("/characters/:lang/nationality/:nationality", charactersController.getByNationality);
PapersPlease.get("/characters/:lang/type/:type", charactersController.getByType);
PapersPlease.get("/characters/:lang/role/:role", charactersController.getByRoles);
PapersPlease.get("/characters/:lang/random", charactersController.getRandom);

PapersPlease.get("/assets/", assetsController.getAll);
PapersPlease.get("/assets/fonts", assetsController.getInGameFonts);
PapersPlease.get("/assets/soundeffects", assetsController.getSoundEffectsController);
PapersPlease.get("/assets/soundeffects/id/:id", assetsController.getSoundEffectsController);
PapersPlease.get("/assets/soundeffects/name/:name", assetsController.getSoundEffectsController);
PapersPlease.get("/assets/soundeffects/id/:id/name/:name", assetsController.getSoundEffectsController);

PapersPlease.get("/credits/", creditsController.getFiltered);
PapersPlease.get("/credits/creator", creditsController.getCreator);
PapersPlease.get("/credits/copyright", creditsController.getCopyright);
PapersPlease.get("/credits/development", creditsController.getDevelopment);
PapersPlease.get("/credits/fonts", creditsController.getFontsDeliveredFrom);
PapersPlease.get("/credits/localizations", creditsController.getLocations);
PapersPlease.get("/credits/sound-contributors", creditsController.getSoundEffectContributors);
PapersPlease.get("/credits/sound-source", creditsController.getSoundEffectSourcedFrom);
PapersPlease.get("/credits/special-thanks", creditsController.getSpecialThanks);
PapersPlease.get("/credits/teams", creditsController.getTeams);
PapersPlease.get("/credits/technologies", creditsController.getTechnologies);

PapersPlease.get("/endings/", FinalesController.getAvailableLanguages);
PapersPlease.get("/endings/:lang", FinalesController.getFiltered);
PapersPlease.get("/endings/:lang/id/:id", FinalesController.getById);
PapersPlease.get("/endings/:lang/title/:titulo", FinalesController.getByTitulo);
PapersPlease.get("/endings/:lang/consecuencias/:texto", FinalesController.filterByConsecuencias);
PapersPlease.get("/endings/:lang/conditions/:texto", FinalesController.filterByCondiciones);
PapersPlease.get("/endings/:lang/type/:tipo", FinalesController.filterByTipo);
PapersPlease.get("/endings/:lang/day/:dia", FinalesController.filterByDia);
PapersPlease.get("/endings/:lang/ezic/:ezic", FinalesController.filterByEzic);

PapersPlease.get("/lore/", LoreController.getAll);
PapersPlease.get("/lore/:lang", LoreController.supportedLenguages);
PapersPlease.get("/lore/:lang/json/", LoreController.getByLanguage);
PapersPlease.get("/lore/:lang/json/:id", LoreController.getByLanguageAndIDs);

PapersPlease.get("/mechanics/", MecanicasController.getAvalibleLenguages);
PapersPlease.get("/mechanics/:lang/", MecanicasController.getFiltered);
PapersPlease.get("/mechanics/:lang/mecanicas", MecanicasController.getAll);
PapersPlease.get("/mechanics/:lang/documents", MecanicasController.getDocumentos);
PapersPlease.get("/mechanics/:lang/documents/type/:tipo", MecanicasController.getDocumentos);
PapersPlease.get("/mechanics/:lang/documents/camp/:campo", MecanicasController.getDocumentos);
PapersPlease.get("/mechanics/:lang/documents/validation/:validacion", MecanicasController.getDocumentos);
PapersPlease.get("/mechanics/:lang/rules", MecanicasController.getReglas);
PapersPlease.get("/mechanics/:lang/events", MecanicasController.getEventos);
PapersPlease.get("/mechanics/:lang/events/id/:id_evento", MecanicasController.getEventos);
PapersPlease.get("/mechanics/:lang/events/name/:nombre", MecanicasController.getEventos);
PapersPlease.get("/mechanics/:lang/penalties", MecanicasController.getPenalizaciones);
PapersPlease.get("/mechanics/:lang/penalties/type/:tipo", MecanicasController.getPenalizaciones);
PapersPlease.get("/mechanics/:lang/penalties/reason/:razon", MecanicasController.getPenalizaciones);
PapersPlease.get("/mechanics/:lang/statistics", MecanicasController.getEstadisticasJugador);
PapersPlease.get("/mechanics/:lang/time", MecanicasController.getTiempo);

PapersPlease.get("/online-stats/", onlineStatsController.showStores);
PapersPlease.get("/online-stats/:game", onlineStatsController.showOptions);
PapersPlease.get("/online-stats/:game/archivements", onlineStatsController.getSteamArchivenments);
PapersPlease.get("/online-stats/:game/online_players", onlineStatsController.getActivePlayers);

PapersPlease.get("/countries/", CountriesController.getFiltered);
PapersPlease.get("/countries/name/:name", CountriesController.getByNombre);
PapersPlease.get("/countries/city/:city", CountriesController.filterByCiudad);

PapersPlease.get("/worldrecord/", recordController.getAll);
PapersPlease.get("/worldrecord/:lang", recordController.getAll);
PapersPlease.get("/worldrecord/:lang/place/", recordController.getAllPlaces);
PapersPlease.get("/worldrecord/:lang/place/:place", recordController.getByPlace);
PapersPlease.get("/worldrecord/:lang/id/:id", recordController.getPlaceByID);

PapersPlease.get("/shops/keys", shopController.getBestSellers);
PapersPlease.get("/shops/", shopController.getAll);
PapersPlease.get("/shops/id/:id", shopController.getById);
PapersPlease.get("/shops/name/:name", shopController.getByName);

PapersPlease.get("/movie/", theMovieController.getAll);
PapersPlease.get("/movie/:lang", theMovieController.getByLanguage);
PapersPlease.get("/movie/:lang/title", theMovieController.getTitle);
PapersPlease.get("/movie/:lang/duration", theMovieController.getDuration);
PapersPlease.get("/movie/:lang/directors", theMovieController.getDirectors);
PapersPlease.get("/movie/:lang/original-creator", theMovieController.getOriginalCreator);
PapersPlease.get("/movie/:lang/genres", theMovieController.getGenres);
PapersPlease.get("/movie/:lang/synopsis", theMovieController.getSynopsis);
PapersPlease.get("/movie/:lang/cast", theMovieController.getCast);
PapersPlease.get("/movie/:lang/links", theMovieController.getLinks);
PapersPlease.get("/movie/:lang/themes", theMovieController.getThemes);
PapersPlease.get("/movie/:lang/images", theMovieController.getImages);
PapersPlease.get("/movie/:lang/awards", theMovieController.getAwards);
PapersPlease.get("/movie/:lang/inspiration", theMovieController.getInspiration);
PapersPlease.get("/movie/:lang/relation", theMovieController.getRelationToGame);
PapersPlease.get("/movie/:lang/reception", theMovieController.getReception);

export default PapersPlease;
