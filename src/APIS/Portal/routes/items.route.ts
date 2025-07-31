import { Router } from "express";
import itemsController from "../controllers/items.controller";

const items = Router();

items.get("/", itemsController.getAll);
items.get("/name/:name", itemsController.searchByName);
items.get("/interactable/:interactable", itemsController.filterByInteractable);
items.get("/portable/:portable", itemsController.filterByPortable);

export default items;