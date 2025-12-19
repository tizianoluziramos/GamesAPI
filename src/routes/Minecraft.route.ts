import { Router } from "express";
import infoController from "controllers/Minecraft/info.controller";
import uuidController from "controllers/Minecraft/tools/player.controller";
import statusController from "controllers/Minecraft/tools/serverinfo.controller";

const minecraft = Router();

minecraft.get("/info", infoController.getVersions);
minecraft.get("/info/:version", infoController.getFilesOnVersion);
minecraft.get("/info/:version/:file", infoController.getFile);

minecraft.get("/tools/server/:ip", statusController.getServerInfo);
minecraft.get("/tools/server/:ip/:port", statusController.getServerInfo);
minecraft.get("/tools/player/:id", uuidController.getInfo);

export default minecraft;
