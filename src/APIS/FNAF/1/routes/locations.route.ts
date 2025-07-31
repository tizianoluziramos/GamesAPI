import { Router } from "express";
import locationsController from "../controllers/locations.controller";

const locations = Router();

locations.get("/", locationsController.getAll);
locations.get("/id/:id", locationsController.getByID);
locations.get("/name/:name", locationsController.getByName);

export default locations;
