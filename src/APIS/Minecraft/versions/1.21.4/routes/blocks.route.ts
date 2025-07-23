import { Router } from "express";
import blocksController from "../controllers/blocks.controller";

const blocks = Router();

blocks.get("/", blocksController.getAll);
blocks.get("/id/:id", blocksController.getById);
blocks.get("/name/:name", blocksController.getByName);
blocks.get("/displayname/:displayName", blocksController.getByDisplayName);

blocks.get("/filter/hardness/:hardness", blocksController.filterByHardness);
blocks.get("/filter/resistance/:resistance", blocksController.filterByResistance);
blocks.get("/filter/stacksize/:stacksize", blocksController.filterByStackSize);
blocks.get("/filter/diggable/:diggable", blocksController.filterByDiggable);
blocks.get("/filter/material/:material", blocksController.filterByMaterial);
blocks.get("/filter/transparent/:transparent", blocksController.filterByTransparent);
blocks.get("/filter/emitlight/:emitlight", blocksController.filterByEmitLight);
blocks.get("/filter/filterlight/:filterlight", blocksController.filterByFilterLight);
blocks.get("/filter/defaultstate/:defaultstate", blocksController.filterByDefaultState);
blocks.get("/filter/minstateid/:minstateid", blocksController.filterByMinStateId);
blocks.get("/filter/maxstateid/:maxstateid", blocksController.filterByMaxStateId);
blocks.get("/filter/boundingbox/:boundingbox", blocksController.filterByBoundingBox);

export default blocks;
