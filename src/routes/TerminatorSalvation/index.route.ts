import { Router } from "express";
import characters from "./characters.route";
import gameinfo from "./gameinfo.route";
import weapons from "./weapons.route";
import indexController from "../../controllers/TerminatorSalvation/index.controller";

const index = Router();

index.get("/", indexController.getRoutes);
index.use("/characters", characters);
index.use("/gameinfo", gameinfo);
index.use("/weapons", weapons);

export default index;
