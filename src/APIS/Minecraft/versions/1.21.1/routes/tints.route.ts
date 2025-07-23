import express from "express";
import tintsController from "../controllers/tints.controller";

const tints = express.Router();

tints.get("/", (req, res) => tintsController.getAll(req, res));
tints.get("/constant", (req, res) => tintsController.getConstant(req, res));
tints.get("/foliage", (req, res) => tintsController.getFoliage(req, res));
tints.get("/grass", (req, res) => tintsController.getGrass(req, res));
tints.get("/redstone", (req, res) => tintsController.getRedstone(req, res));
tints.get("/water", (req, res) => tintsController.getWater(req, res));

export default tints;
