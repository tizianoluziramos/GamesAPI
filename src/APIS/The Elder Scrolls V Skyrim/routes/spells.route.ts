import { Router } from "express";
import spellsController from "../controllers/spells.controller";

const spells = Router();

spells.get("/", spellsController.getAll);
spells.get("/name/:name", spellsController.getByName);
spells.get("/school/:school", spellsController.filterBySchool);

export default spells;
