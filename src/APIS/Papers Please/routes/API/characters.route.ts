import { Router } from "express";
import charactersController from "../../controllers/characters.controller";

const router = Router();

router.get("/", charactersController.getAvailableLanguages);
router.get("/all", charactersController.getAllLanguagesData);

router.get("/:lang", charactersController.getPersonajes);
router.get("/:lang/id/:id", charactersController.getById);
router.get("/:lang/name/:name", charactersController.getByName);
router.get(
  "/:lang/nationality/:nationality",
  charactersController.getByNationality
);
router.get("/:lang/type/:type", charactersController.getByType);
router.get("/:lang/role/:role", charactersController.getByRoles);
router.get("/:lang/random", charactersController.getRandom);

export default router;
