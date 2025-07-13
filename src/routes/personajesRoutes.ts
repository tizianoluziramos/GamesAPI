import { Router } from "express";
import personajesController from "../controllers/PersonajeController";

const router = Router();

router.get("/", personajesController.getFiltered);

router.get("/id", personajesController.getById);

router.get("/name", personajesController.getByName);

router.get("/nationality", personajesController.getByNationality);

router.get("/type", personajesController.getByType);

router.get("/roles", personajesController.getByRoles);

export default router;
