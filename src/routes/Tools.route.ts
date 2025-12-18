import { Router } from "express";
import Recommender from "../controllers/tools/recommender.controller";

const Tools = Router();

Tools.get("/recommender", Recommender.recommend);

export default Tools;