import { Router } from "express";
import gameinfoController from "../../controllers/Fnaf/gameinfo.controller";

const gameinfo = Router();

gameinfo.get("/", gameinfoController.getAll);

export default gameinfo;
