import { Router } from "express";
import gameinfoController from "../controllers/gameinfo.controller";

const gameinfo = Router();

gameinfo.get("/", gameinfoController.getAll);

export default gameinfo;
