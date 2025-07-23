import { Router } from "express";
import attributesController from "../controllers/attributes.controller";

const attributes = Router();

attributes.get("/", attributesController.getAll);
attributes.get("/name/:name", attributesController.getByName);
attributes.get("/resource/:resource", attributesController.getByResource);
attributes.get("/filter/max/:max", attributesController.filterByMax);
attributes.get("/filter/default/:default", attributesController.filterByDefault);

export default attributes;
