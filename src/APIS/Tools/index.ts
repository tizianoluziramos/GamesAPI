import { Router } from "express";
import gamerecommender from "./routes/gamerecommender.route";
import indexController from "./controllers/index.controller";
import gamedatabase from "./routes/gamedatabase.route";

const router = Router();

router.get("/", indexController.getRoutes);
router.use("/gamerecommender", gamerecommender);
router.use("/gamesdatabase", gamedatabase);

export default router;
