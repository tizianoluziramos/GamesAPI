import { Router } from "express";
import blocksController from "../controllers/blocks.controller";

const blocks = Router();

blocks.get("/", blocksController.getAll)
blocks.get("/name/:name", blocksController.searchByName)
blocks.get("/interactable/:interactable", blocksController.filterByInteractable)
blocks.get("/portalsurface/:portalsurface", blocksController.filterByPortalSurface)

export default blocks;