import { Router } from "express";
import gamerecommender from "../controllers/gamerecommender.controller";

const router = Router();

router.get("/", gamerecommender.recommend);

export default router;
