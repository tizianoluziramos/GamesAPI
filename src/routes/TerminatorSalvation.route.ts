import { Router } from "express";

import charactersController from "../controllers/TerminatorSalvation/characters.controller";
import gameinfoController from "../controllers/TerminatorSalvation/gameinfo.controller";
import weaponsController from "../controllers/TerminatorSalvation/weapons.controller";
import indexController from "../controllers/TerminatorSalvation/index.controller";

const TerminatorSalvation = Router();

TerminatorSalvation.get("/", indexController.getRoutes);

TerminatorSalvation.get("/characters", charactersController.getAll);
TerminatorSalvation.get("/characters/id/:id", charactersController.getById);
TerminatorSalvation.get("/characters/name/:name", charactersController.getByName);

TerminatorSalvation.get("/gameinfo", gameinfoController.getAll);
TerminatorSalvation.get("/gameinfo/composer", gameinfoController.getComposer);
TerminatorSalvation.get("/gameinfo/description", gameinfoController.getDescription);
TerminatorSalvation.get("/gameinfo/developer", gameinfoController.getDeveloper);
TerminatorSalvation.get("/gameinfo/development", gameinfoController.getDevelopment);
TerminatorSalvation.get("/gameinfo/directors", gameinfoController.getDirectors);
TerminatorSalvation.get("/gameinfo/engine", gameinfoController.getEngine);
TerminatorSalvation.get("/gameinfo/genre", gameinfoController.getGenre);
TerminatorSalvation.get("/gameinfo/iosversionsummary", gameinfoController.getIosVersionSummary);
TerminatorSalvation.get("/gameinfo/modes", gameinfoController.getModes);
TerminatorSalvation.get("/gameinfo/platforms", gameinfoController.getPlatforms);
TerminatorSalvation.get("/gameinfo/plotsummary", gameinfoController.getPlotSummary);
TerminatorSalvation.get("/gameinfo/producers", gameinfoController.getProducers);
TerminatorSalvation.get("/gameinfo/publisher", gameinfoController.getPublisher);
TerminatorSalvation.get("/gameinfo/releasedates", gameinfoController.getReleaseDates);
TerminatorSalvation.get("/gameinfo/series", gameinfoController.getSeries);
TerminatorSalvation.get("/gameinfo/title", gameinfoController.getTitle);
TerminatorSalvation.get("/gameinfo/writers", gameinfoController.getWriters);

TerminatorSalvation.get("/gameinfo/reception", gameinfoController.reception.getAll);
TerminatorSalvation.get("/gameinfo/reception/generalreception", gameinfoController.reception.getGeneralReception);
TerminatorSalvation.get("/gameinfo/reception/reviewscores", gameinfoController.reception.getReviewScores);
TerminatorSalvation.get("/gameinfo/reception/aggregatedscores", gameinfoController.reception.AggregatedScores.getAll);
TerminatorSalvation.get("/gameinfo/reception/aggregatedscores/gamerankings", gameinfoController.reception.AggregatedScores.getGameRankings);
TerminatorSalvation.get("/gameinfo/reception/aggregatedscores/metacritic", gameinfoController.reception.AggregatedScores.getMetacritic);

TerminatorSalvation.get("/weapons", weaponsController.getAll);
TerminatorSalvation.get("/weapons/handguns", weaponsController.getHandguns);
TerminatorSalvation.get("/weapons/launchers", weaponsController.getLaunchers);
TerminatorSalvation.get("/weapons/machineguns", weaponsController.getMachineGuns);
TerminatorSalvation.get("/weapons/rifles", weaponsController.getRifles);
TerminatorSalvation.get("/weapons/shotguns", weaponsController.getShotguns);
TerminatorSalvation.get("/weapons/submachinehandguns", weaponsController.getSubmachineHandGuns);

export default TerminatorSalvation;
