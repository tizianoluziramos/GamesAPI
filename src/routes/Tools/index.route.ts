import { Router } from "express";
import gamerecommender from "./gamerecommender.route";
import indexController from "../../controllers/tools/gamerecommender/index.controller";

const router = Router();

router.get("/", indexController.getRoutes);
router.use("/gamerecommender", gamerecommender);

export default router;
