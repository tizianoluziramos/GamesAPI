import { Router } from "express";
import gamerecommender from "./routes/gamerecommender.route";
import indexController from "./controllers/index.controller";

const router = Router();

router.get("/", indexController.getRoutes);
router.use("/gamerecommender", gamerecommender);

export default router;
