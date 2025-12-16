import { Router } from "express";
import locationsController from "../../controllers/TheElderScrollsVSkyrim/locations.controller";

const locations = Router();

locations.get("/", locationsController.getAll);
locations.get("/locations", locationsController.getLocations);
locations.get("/images", locationsController.getImages);
locations.get("/externallinks", locationsController.getExternalLinks);

export default locations;
