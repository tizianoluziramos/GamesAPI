import express from "express";
import particlesController from "../controllers/particles.controller";

const particles = express.Router();

particles.get("/", (req, res) => particlesController.getAll(req, res));
particles.get("/id/:id", (req, res) => particlesController.getById(req, res));
particles.get("/name/:name", (req, res) => particlesController.getByName(req, res));

export default particles;
