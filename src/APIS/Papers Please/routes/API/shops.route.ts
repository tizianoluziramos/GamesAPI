import { Router } from "express";
import tiendaController from "../../controllers/shops.controller";

const router = Router();

if (process.env.ENVIRONMENT === "Production") {
  router.get("/keys", tiendaController.getBestSellers);
}

router.get("/", tiendaController.getAll);
router.get("/id/:id", tiendaController.getById);
router.get("/name/:name", tiendaController.getByName);
export default router;
