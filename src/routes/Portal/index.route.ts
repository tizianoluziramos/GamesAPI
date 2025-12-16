import { Router } from "express";
import { index as indice } from "../../controllers/Portal/index.controller";
import gameinfo from "./gameinfo.route";
import blocks from "./blocks.route";
import characters from "./characters.route";
import items from "./items.route";
import mechanics from "./mechanics.route";
import testchambers from "./testchambers.route";
import walkthrough from "./walkthrough.route";

const index = Router();

index.get("/", indice.index);
index.use("/gameinfo", gameinfo);
index.use("/blocks", blocks);
index.use("/characters", characters);
index.use("/items", items);
index.use("/mechanics", mechanics);
index.use("/testchambers", testchambers);
index.use("/walkthrough", walkthrough);

export default index;
