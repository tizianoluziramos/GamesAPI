import { Router } from "express";
import characters from "./routes/characters.route";
import gameinfo from "./routes/gameinfo.route";
import locations from "./routes/locations.route";
import indexController from "./controllers/index.controller";

const index = Router();

index.get("/", indexController.getRoutes);
index.use("/characters", characters);
index.use("/gameinfo", gameinfo);
index.use("/locations", locations);

export default index;
