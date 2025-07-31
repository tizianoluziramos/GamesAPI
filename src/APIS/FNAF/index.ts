import { Router } from "express";
import fnaf1 from "./1/index";
import indexController from "./controllers/index.controller";

const index = Router();

index.get("/", indexController.getRoutes);
index.use("/fnaf1", fnaf1);

export default index;
