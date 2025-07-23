import express from "express";
import itemsController from "../controllers/items.controller";

const items = express.Router();

items.get("/", (req, res) => itemsController.getAll(req, res));
items.get("/id/:id", (req, res) => itemsController.getById(req, res));
items.get("/name/:name", (req, res) => itemsController.getByName(req, res));
items.get("/displayname/:displayname", (req, res) => itemsController.getByDisplayName(req, res));
items.get("/filter/stacksize/:stackSize", (req, res) => itemsController.filterByStackSize(req, res));

export default items;
