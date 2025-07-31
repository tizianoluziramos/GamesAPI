import { Router } from "express";
import charactersController from "../controllers/characters.controller";

const characters = Router();

characters.get("/", charactersController.getAll);

export default characters;