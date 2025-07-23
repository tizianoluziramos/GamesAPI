import express from "express";
import recipesController from "../controllers/recipes.controller";

const recipes = express.Router();

recipes.get("/", (req, res) => recipesController.getAll(req, res));
recipes.get("/resultId/:resultId", (req, res) => recipesController.getByResultId(req, res));
recipes.get("/ingredientId/:ingredientId", (req, res) => recipesController.getByIngredient(req, res));

export default recipes;
