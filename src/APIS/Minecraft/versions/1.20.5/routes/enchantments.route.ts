import { Router } from "express";
import enchantmentsController from "../controllers/enchantments.controller";

const enchantments = Router();

enchantments.get("/", enchantmentsController.getAll);
enchantments.get("/id/:id", enchantmentsController.getById);
enchantments.get("/name/:name", enchantmentsController.getByName);
enchantments.get("/display_name/:display_name", enchantmentsController.getByDisplayName);
enchantments.get("/filter/max_level/:max_level", enchantmentsController.filterByMaxLevel);
enchantments.get("/filter/treasureonly/:treasureonly", enchantmentsController.filterByTreasureOnly);
enchantments.get("/filter/curse/:curse", enchantmentsController.filterByCurse);
enchantments.get("/filter/category/:category", enchantmentsController.filterByCategory);
enchantments.get("/filter/weight/:weight", enchantmentsController.filterByWeight);
enchantments.get("/filter/tradeable/:tradeable", enchantmentsController.filterByTradeable);
enchantments.get("/filter/discoverable/:discoverable", enchantmentsController.filterByDiscoverable);

export default enchantments;
