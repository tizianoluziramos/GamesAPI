import { Router } from "express";
import biomesController from "../controllers/biomes.controller";

const biomes = Router();

biomes.get("/", biomesController.getAll);
biomes.get("/id/:id", biomesController.getById);
biomes.get("/name/:name", biomesController.getByName);
biomes.get("/displayName/:displayName", biomesController.getByDisplayName);
biomes.get("/filter/category/:category", biomesController.filterByCategory);
biomes.get("/filter/temperature/:temperature", biomesController.filterByTemperature);
biomes.get("/filter/precipitation/:precipitation", biomesController.filterByPrecipitation);
biomes.get("/filter/dimension/:dimension", biomesController.filterByDimension);
biomes.get("/filter/color/:color", biomesController.filterByColor);

export default biomes;
