import { Router } from "express";
import endingsController from "../controllers/endings.controller";

const endings = Router();

endings.get("/", endingsController.getAll);
endings.get("/branches", endingsController.getBranches);
endings.get("/neutralendings", endingsController.getNeutralEndings);
endings.get("/neutralroutes", endingsController.getNeutralRoutes);

export default endings;
