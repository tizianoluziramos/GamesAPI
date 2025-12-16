import { Router } from "express";
import weaponsController from "../../controllers/TheElderScrollsVSkyrim/weapons.controller";

const weapons = Router();

weapons.get("/", weaponsController.getAll);
weapons.get("/:language", weaponsController.getByLanguage);
weapons.get("/:language/:name", weaponsController.getByName);

export default weapons;
