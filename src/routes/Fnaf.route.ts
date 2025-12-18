import { Router } from "express";

import charactersController from "../controllers/Fnaf/characters.controller";
import gameinfoController from "../controllers/Fnaf/gameinfo.controller";
import locationsController from "../controllers/Fnaf/locations.controller";

const fnaf = Router();

fnaf.get("/characters/", charactersController.getAll);
fnaf.get("/characters/id/:id", charactersController.getByID);
fnaf.get("/characters/name/:name", charactersController.searchByName);
fnaf.get("/gameinfo/", gameinfoController.getAll);

fnaf.get("/locations/", locationsController.getAll);
fnaf.get("/locations/id/:id", locationsController.getByID);
fnaf.get("/locations/name/:name", locationsController.getByName);

export default fnaf;
