import { Router } from "express";
import recordController from "../../controllers/record.controller";

const router = Router();

router.get("/", recordController.getAll);
router.get("/:lang", recordController.getAll);
router.get("/:lang/place/", recordController.getAllPlaces);
router.get("/:lang/place/:place", recordController.getByPlace);
router.get("/:lang/id/:id", recordController.getPlaceByID);

export default router;
