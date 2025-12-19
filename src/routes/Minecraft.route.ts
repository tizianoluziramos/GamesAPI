import { Router } from "express";
import infoController from "controllers/Minecraft/info.controller";

const minecraft = Router();

minecraft.get("/info", infoController.getVersions);
minecraft.get("/info/:version", infoController.getFilesOnVersion);
minecraft.get("/info/:version/:file", infoController.getFile);

export default minecraft;
