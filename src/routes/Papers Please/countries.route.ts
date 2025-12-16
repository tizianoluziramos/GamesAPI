import { Router } from "express";
import PaisesController from "../../controllers/Papers Please/countries.controller";

const router = Router();

router.get("/", PaisesController.getFiltered);

router.get("/name/:name", PaisesController.getByNombre);
router.get("/city/:city", PaisesController.filterByCiudad);

export default router;
