import { Router } from "express";
import gamerecommender from "../../controllers/tools/gamerecommender/gamerecommender.controller";

const gamerecommenderRouter = Router();

gamerecommenderRouter.get("/", gamerecommender.recommend);

export default gamerecommenderRouter;