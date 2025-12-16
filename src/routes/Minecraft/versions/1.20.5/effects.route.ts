import { Router } from "express";
import effectsController from "../../../../controllers/Minecraft/versions/1.20.5/effects.controller";

const effects = Router();

effects.get("/", effectsController.getAll);
effects.get("/id/:id", effectsController.getById);
effects.get("/name/:name", effectsController.getByName);
effects.get("/displayname/:displayname", effectsController.getByDisplayName);
effects.get("/filter/type/:type", effectsController.filterByType);

export default effects;
