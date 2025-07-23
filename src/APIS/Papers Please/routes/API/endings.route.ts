import { Router } from "express";
import { FinalesController } from "../../controllers/endings.controller";

const router = Router();

router.get("/", FinalesController.getAvailableLanguages);

router.get("/:lang", FinalesController.getFiltered);

router.get("/:lang/id/:id", FinalesController.getById);

router.get("/:lang/title/:titulo", FinalesController.getByTitulo);

router.get(
  "/:lang/consecuencias/:texto",
  FinalesController.filterByConsecuencias
);

router.get("/:lang/conditions/:texto", FinalesController.filterByCondiciones);

router.get("/:lang/type/:tipo", FinalesController.filterByTipo);

router.get("/:lang/day/:dia", FinalesController.filterByDia);

router.get("/:lang/ezic/:ezic", FinalesController.filterByEzic);

export default router;
