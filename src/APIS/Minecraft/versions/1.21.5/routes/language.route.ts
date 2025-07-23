import { Router } from "express";
import languageController from "../controllers/language.controller";

const language = Router();

language.get("/", languageController.getAll);

export default language;
