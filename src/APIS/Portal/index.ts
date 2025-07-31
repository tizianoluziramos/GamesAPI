import { Router } from "express";
import { index as indice } from "./controllers/index.controller";
import gameinfo from "./routes/gameinfo.route";
import blocks from "./routes/blocks.route";
import characters from "./routes/characters.route";
import items from "./routes/items.route";
import mechanics from "./routes/mechanics.route";
import testchambers from "./routes/testchambers.route";
import walkthrough from "./routes/walkthrough.route";

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
