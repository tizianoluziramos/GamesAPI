import { Router } from "express";
import indexController from "../../../../controllers/Minecraft/versions/1.20.4/index.controller";
import blocks from "./blocks.route";
import sounds from "./sounds.route";

const index = Router();

index.get("/", indexController.getRoutes);
index.use("/blocks", blocks);
index.use("/sounds", sounds);

export default index;
