import { Router } from "express";
import indexController from "./controllers/index.controller";
import blocks from "./routes/blocks.route";
import sounds from "./routes/sounds.route";

const index = Router();

index.get("/", indexController.getRoutes);
index.use("/blocks", blocks);
index.use("/sounds", sounds);

export default index;
