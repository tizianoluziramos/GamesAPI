import { Router } from "express";
import gameinfoController from "../../controllers/fnaf1/gameinfo.controller";

const gameinfo = Router();

gameinfo.get("/", gameinfoController.getAll);

export default gameinfo;
