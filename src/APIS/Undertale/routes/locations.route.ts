import { Router } from "express";
import LocationsController from "../controllers/locations.controller";

const router = Router();

router.get("/", LocationsController.getAll);
router.get("/category/:category", LocationsController.getCategory);
router.get("/hotland/amalgamates", LocationsController.getAmalgamates);
router.get("/search/:name", LocationsController.searchByName);
router.get("/id/:id", LocationsController.getById);

export default router;
