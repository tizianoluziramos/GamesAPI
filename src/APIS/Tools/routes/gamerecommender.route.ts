import { Router } from "express";
import gamerecommender from "../controllers/gamerecommender.controller";

const router = Router();

router.get("/", gamerecommender.postOnlyError);
router.post("/", gamerecommender.recommend);

export default router;
