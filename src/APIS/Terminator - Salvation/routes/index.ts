import { Router } from "express";
import characters from "./API/characters.route";
import gameinfo from "./API/gameinfo.route";
import weapons from "./API/weapons.route";
import indexController from "../controllers/index.controller";

const index = Router();

index.get("/", indexController.getRoutes);
index.use("/characters", characters);
index.use("/gameinfo", gameinfo);
index.use("/weapons", weapons);

export default index;
