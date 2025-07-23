import { Router } from "express";
import PaisesController from "../../controllers/countries.controller";

const router = Router();

router.get("/", PaisesController.getFiltered);

router.get("/name/:name", PaisesController.getByNombre);
router.get("/city/:city", PaisesController.filterByCiudad);

export default router;
