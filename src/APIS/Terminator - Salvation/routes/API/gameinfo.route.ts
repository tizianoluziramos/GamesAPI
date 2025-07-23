import { Router } from "express";
import gameinfoController from "../../controllers/gameinfo.controller";


const gameinfo = Router();

gameinfo.get("/", gameinfoController.getAll);
gameinfo.get("/composer", gameinfoController.getComposer);
gameinfo.get("/description", gameinfoController.getDescription);
gameinfo.get("/developer", gameinfoController.getDeveloper);
gameinfo.get("/development", gameinfoController.getDevelopment);
gameinfo.get("/directors", gameinfoController.getDirectors);
gameinfo.get("/engine", gameinfoController.getEngine);
gameinfo.get("/genre", gameinfoController.getGenre);
gameinfo.get("/iosversionsummary", gameinfoController.getIosVersionSummary);
gameinfo.get("/modes", gameinfoController.getModes);
gameinfo.get("/platforms", gameinfoController.getPlatforms);
gameinfo.get("/plotsummary", gameinfoController.getPlotSummary);
gameinfo.get("/producers", gameinfoController.getProducers);
gameinfo.get("/publisher", gameinfoController.getPublisher);
gameinfo.get("/releasedates", gameinfoController.getReleaseDates);
gameinfo.get("/series", gameinfoController.getSeries);
gameinfo.get("/title", gameinfoController.getTitle);
gameinfo.get("/writers", gameinfoController.getWriters);
gameinfo.get("/reception", gameinfoController.reception.getAll);
gameinfo.get("/reception/generalreception", gameinfoController.reception.getGeneralReception);
gameinfo.get("/reception/reviewscores", gameinfoController.reception.getReviewScores);
gameinfo.get("/reception/aggregatedscores", gameinfoController.reception.AggregatedScores.getAll);
gameinfo.get("/reception/aggregatedscores/gamerankings", gameinfoController.reception.AggregatedScores.getGameRankings);
gameinfo.get("/reception/aggregatedscores/metacritic", gameinfoController.reception.AggregatedScores.getMetacritic);

export default gameinfo;