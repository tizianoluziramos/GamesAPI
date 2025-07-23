import { Router } from "express";
import MecanicasController from "../../controllers/mechanics.controller";

const router = Router();

router.get("/", MecanicasController.getAvalibleLenguages);
router.get("/:lang/", MecanicasController.getFiltered);
router.get("/:lang/mecanicas", MecanicasController.getAll);
router.get("/:lang/documents", MecanicasController.getDocumentos);
router.get("/:lang/documents/type/:tipo", MecanicasController.getDocumentos);
router.get("/:lang/documents/camp/:campo", MecanicasController.getDocumentos);
router.get(
  "/:lang/documents/validation/:validacion",
  MecanicasController.getDocumentos
);
router.get("/:lang/rules", MecanicasController.getReglas);
router.get("/:lang/events", MecanicasController.getEventos);
router.get("/:lang/events/id/:id_evento", MecanicasController.getEventos);
router.get("/:lang/events/name/:nombre", MecanicasController.getEventos);
router.get("/:lang/penalties", MecanicasController.getPenalizaciones);
router.get(
  "/:lang/penalties/type/:tipo",
  MecanicasController.getPenalizaciones
);
router.get(
  "/:lang/penalties/reason/:razon",
  MecanicasController.getPenalizaciones
);
router.get("/:lang/statistics", MecanicasController.getEstadisticasJugador);
router.get("/:lang/time", MecanicasController.getTiempo);

export default router;
