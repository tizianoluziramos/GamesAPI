import { Router } from "express";
import Recommender from "controllers/Tools/recommender.controller";

const Tools = Router();

Tools.get("/recommender", Recommender.recommend);

export default Tools;