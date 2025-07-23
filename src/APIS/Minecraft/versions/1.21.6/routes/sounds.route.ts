import express from "express";
import soundsController from "../controllers/sounds.controller";

const sounds = express.Router();

sounds.get("/", (req, res) => soundsController.getAll(req, res));
sounds.get("/id/:id", (req, res) => soundsController.getById(req, res));
sounds.get("/name/:name", (req, res) => soundsController.getByName(req, res));

export default sounds;
