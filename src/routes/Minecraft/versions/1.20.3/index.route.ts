import { Router } from "express";
import blockColissionShapes from "./blockColissionShapes.route";
import blocks from "./blocks.route";
import entities from "./entities.route";
import foods from "./foods.route";
import items from "./items.route";
import materials from "./materials.route";
import particles from "./particles.route";
import recipes from "./recipes.route";
import language from "./language.route";
import protocol from "./protocol.route";
import indexController from "../../../../controllers/Minecraft/versions/1.20.3/index.controller";
import loginPacket from "./loginPacket.route";
import commands from "./commands.route";

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
