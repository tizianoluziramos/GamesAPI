import { Router } from "express";
import indexController from "../../controllers/index.controller";

const index = Router();

index.get("/", indexController.getRoutes);

export default index;
