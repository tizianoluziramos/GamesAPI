import { Router } from "express";
import itemsController from "../controllers/items.controller";

const items = Router();

items.get("/", itemsController.getAll);
items.get("/:name", itemsController.searchByName);

export default items;
