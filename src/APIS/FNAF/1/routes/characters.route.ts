import { Router } from "express";
import charactersController from "../controllers/characters.controller";

const characters = Router();

characters.get("/", charactersController.getAll);
characters.get("/id/:id", charactersController.getByID);
characters.get("/name/:name", charactersController.searchByName);

export default characters;
