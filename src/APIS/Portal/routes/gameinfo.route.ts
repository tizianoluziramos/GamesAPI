import { Router } from "express";
import GameinfoController from "../controllers/gameinfo.controller";

const router = Router();

router.get("/", GameinfoController.getAll);

router.get("/platforms", GameinfoController.getPlatforms);

router.get("/modes", GameinfoController.getModes);

router.get("/languages", GameinfoController.getLanguages);

export default router;
