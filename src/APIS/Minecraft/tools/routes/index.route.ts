import { Router } from "express";
import statusController from "../controller/status.controller";

const index = Router();

index.get("/", statusController.getRoutes);

export default index;
