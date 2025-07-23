import { Router } from "express";
import charactersController from "../../controllers/characters.controller"

const characters = Router();

characters.get("/", charactersController.getAll);
characters.get("/id/:id", charactersController.getById);
characters.get("/name/:name", charactersController.getByName);

export default characters;