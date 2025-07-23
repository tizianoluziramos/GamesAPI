import { Router } from "express";
import indexController from "./controllers/index.controller";
import characters from "./routes/characters.route";
import weapons from "./routes/weapons.route";
import quests from "./routes/quests.route";

const index = Router();

index.get("/", indexController.getRoutes);
index.use("/characters", characters);
index.use("/weapons", weapons);
index.use("/quests", quests);

export default index;
