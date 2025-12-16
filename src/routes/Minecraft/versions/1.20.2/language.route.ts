import { Router } from "express";
import languageController from "../../../../controllers/Minecraft/versions/1.20.2/language.controller";

const language = Router();

language.get("/", languageController.getAll);

export default language;
