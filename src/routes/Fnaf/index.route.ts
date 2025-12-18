import { Router } from "express";
import characters from "./characters.route";
import gameinfo from "./gameinfo.route";
import locations from "./locations.route";

const fnaf1 = Router();

fnaf1.use("/characters", characters);
fnaf1.use("/gameinfo", gameinfo);
fnaf1.use("/locations", locations);

export default fnaf1;