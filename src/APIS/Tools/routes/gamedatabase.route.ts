import express from "express";
import gamedatabaseController from "../controllers/gamedatabase.controller";

const router = express.Router();

router.get("/", (req, res) => gamedatabaseController.getAll(req, res));

router.get("/search/:name", (req, res) => gamedatabaseController.searchByName(req, res));

router.get("/total", (req, res) => gamedatabaseController.getTotalGames(req, res));

router.get("/:sid", (req, res) => gamedatabaseController.getBySid(req, res));

export default router;
