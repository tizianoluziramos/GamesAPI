import express from "express";
import entitiesController from "../controllers/entities.controller";

const entities = express.Router();

entities.get("/", entitiesController.getAll);
entities.get("/id/:id", (req, res) => entitiesController.getById(req, res));
entities.get("/internalId/:internalId", (req, res) => entitiesController.getByInternalId(req, res));
entities.get("/name/:name", (req, res) => entitiesController.getByName(req, res));
entities.get("/displayName/:displayName", (req, res) => entitiesController.getByDisplayName(req, res));
entities.get("/filter/type/:type", (req, res) => entitiesController.filterByType(req, res));
entities.get("/filter/category/:category", (req, res) => entitiesController.filterByCategory(req, res));

export default entities;
