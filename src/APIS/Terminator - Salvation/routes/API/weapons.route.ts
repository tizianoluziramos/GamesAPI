import { Router } from "express";
import weaponsController from "../../controllers/weapons.controller";

const weapons = Router();

weapons.get("/", weaponsController.getAll)
weapons.get("/handguns", weaponsController.getHandguns)
weapons.get("/launchers", weaponsController.getLaunchers)
weapons.get("/machineguns", weaponsController.getMachineGuns)
weapons.get("/rifles", weaponsController.getRifles)
weapons.get("/shotguns", weaponsController.getShotguns)
weapons.get("/submachinehandguns", weaponsController.getSubmachineHandGuns)

export default weapons;