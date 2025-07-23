import express from "express";
import instrumentsController from "../controllers/instruments.controller";

const instruments = express.Router();

instruments.get("/", (req, res) => instrumentsController.getAll(req, res));
instruments.get("/id/:id", (req, res) => instrumentsController.getById(req, res));
instruments.get("/name/:name", (req, res) => instrumentsController.getByName(req, res));

export default instruments;
