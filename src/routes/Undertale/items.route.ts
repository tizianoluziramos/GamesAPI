import { Router } from "express";
import itemsController from "../../controllers/Undertale/items.controller";

const items = Router();

items.get("/", itemsController.getAll);
items.get("/:name", itemsController.searchByName);

export default items;
