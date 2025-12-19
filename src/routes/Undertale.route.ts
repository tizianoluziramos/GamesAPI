import { Router } from "express";

import charactersController from "controllers/Undertale/characters.controller";
import locationsController from "controllers/Undertale/locations.controller";
import itemsController from "controllers/Undertale/items.controller";
import endingsController from "controllers/Undertale/endings.controller";

const undertale = Router();

undertale.get("/characters", charactersController.getAll);
undertale.get("/characters/:type", charactersController.getByType);

undertale.get("/locations", locationsController.getAll);
undertale.get("/locations/category/:category", locationsController.getCategory);
undertale.get("/locations/hotland/amalgamates", locationsController.getAmalgamates);
undertale.get("/locations/search/:name", locationsController.searchByName);
undertale.get("/locations/id/:id", locationsController.getById);

undertale.get("/items", itemsController.getAll);
undertale.get("/items/:name", itemsController.searchByName);
undertale.get("/endings", endingsController.getAll);
undertale.get("/endings/branches", endingsController.getBranches);
undertale.get("/endings/neutralendings", endingsController.getNeutralEndings);
undertale.get("/endings/neutralroutes", endingsController.getNeutralRoutes);

export default undertale;