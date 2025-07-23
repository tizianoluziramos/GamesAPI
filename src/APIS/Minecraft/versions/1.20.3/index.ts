import { Router } from "express";
import blockColissionShapes from "./routes/blockColissionShapes.route";
import blocks from "./routes/blocks.route";
import entities from "./routes/entities.route";
import foods from "./routes/foods.route";
import items from "./routes/items.route";
import materials from "./routes/materials.route";
import particles from "./routes/particles.route";
import recipes from "./routes/recipes.route";
import language from "./routes/language.route";
import protocol from "./routes/protocol.route";
import indexController from "./controllers/index.controller";
import loginPacket from "./routes/loginPacket.route";
import commands from "./routes/commands.route";

const index = Router();

index.get("/", indexController.getRoutes);
index.use("/blockColissionShapes", blockColissionShapes);
index.use("/blocks", blocks);
index.use("/entities", entities);
index.use("/foods", foods);
index.use("/items", items);
index.use("/materials", materials);
index.use("/particles", particles);
index.use("/recipes", recipes);
index.use("/language", language);
index.use("/protocol", protocol);
index.use("/loginPacket", loginPacket);
index.use("/commands", commands);

export default index;
