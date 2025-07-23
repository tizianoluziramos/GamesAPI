import { Router } from "express";
import index from "./API/index.route";
import characters from "./API/characters.route";
import assets from "./API/assets.route";
import credits from "./API/credits.route";
import endings from "./API/endings.route";
import lore from "./API/lore.route";
import mechanics from "./API/mechanics.route";
import online_stats from "./API/online_stats.route";
import countries from "./API/countries.route";
import record from "./API/record.route";
import TheMovie from "./API/TheMovie.route";
import shops from "./API/shops.route";

const PapersPleaseAPI = Router();

PapersPleaseAPI.get("/", index);

PapersPleaseAPI.use("/characters", characters);
PapersPleaseAPI.use("/assets", assets);
PapersPleaseAPI.use("/credits", credits);
PapersPleaseAPI.use("/endings", endings);
PapersPleaseAPI.use("/lore", lore);
PapersPleaseAPI.use("/mechanics", mechanics);
PapersPleaseAPI.use("/online-stats", online_stats);
PapersPleaseAPI.use("/countries", countries);
PapersPleaseAPI.use("/worldrecord", record);
PapersPleaseAPI.use("/movie", TheMovie);
PapersPleaseAPI.use("/shops", shops);

export default PapersPleaseAPI;
