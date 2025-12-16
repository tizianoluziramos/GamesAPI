import { Router } from "express";
import MapIconsController from "../../../../controllers/Minecraft/versions/1.20.2/mapIcons.controller";

const mapIcons = Router();

mapIcons.get("/", MapIconsController.getAll);

mapIcons.get("/id/:id", MapIconsController.getById);

mapIcons.get("/name/:name", MapIconsController.getByName);

mapIcons.get("/appearance/:appearance", MapIconsController.getByAppearance);

mapIcons.get("/visible/:visible", MapIconsController.filterByVisibleInItemFrame);

export default mapIcons;
