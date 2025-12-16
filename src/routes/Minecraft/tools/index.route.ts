import { Router } from "express";
import statusController from "../../../controllers/Minecraft/tools/status.controller";
import status from "./status.route";
const index = Router();

index.get("/", statusController.getRoutes);
index.use("/status", status);

export default index;
