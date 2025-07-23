import { Router } from "express";
import versions from "./versions";
import indexController from "./controllers/index.controller";
import tools from "./tools";

const index = Router();

index.get("/", indexController.getRoutes);
index.use("/versions", versions);
index.use("/tools", tools);

export default index;
