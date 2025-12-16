import { Router } from "express";
import characters from "./characters.route";
import assets from "./assets.route";
import credits from "./credits.route";
import endings from "./endings.route";
import lore from "./lore.route";
import mechanics from "./mechanics.route";
import online_stats from "./online_stats.route";
import countries from "./countries.route";
import record from "./record.route";
import TheMovie from "./TheMovie.route";
import shops from "./shops.route";

const PapersPlease = Router();

PapersPlease.use("/characters", characters);
PapersPlease.use("/assets", assets);
PapersPlease.use("/credits", credits);
PapersPlease.use("/endings", endings);
PapersPlease.use("/lore", lore);
PapersPlease.use("/mechanics", mechanics);
PapersPlease.use("/online-stats", online_stats);
PapersPlease.use("/countries", countries);
PapersPlease.use("/worldrecord", record);
PapersPlease.use("/movie", TheMovie);
PapersPlease.use("/shops", shops);

export default PapersPlease;
