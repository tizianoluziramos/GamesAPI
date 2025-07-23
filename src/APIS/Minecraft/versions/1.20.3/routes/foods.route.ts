import express from "express";
import foodsController from "../controllers/foods.controller";

const foods = express.Router();

foods.get("/", (req, res) => foodsController.getAll(req, res));
foods.get("/id/:id", (req, res) => foodsController.getById(req, res));
foods.get("/name/:name", (req, res) => foodsController.getByName(req, res));
foods.get("/displayname/:displayname", (req, res) => foodsController.getByDisplayName(req, res));
foods.get("/filter/stacksize/:stacksize", (req, res) => foodsController.filterByStackSize(req, res));

export default foods;
