import { Router } from "express";
import statusController from "../controller/status.controller";
import uuidController from "../controller/uuid.controller";
import serverstatusController from "../controller/serverstatus.controller";

const router = Router();

router.get("/", statusController.getRoutes);
router.get("/server/", serverstatusController.getServerStatus);
router.get("/server/:ip", serverstatusController.getServerStatus);
router.get("/server/:ip/:port", serverstatusController.getServerStatus);
router.get("/player", uuidController.getInfo);
router.get("/player/:id", uuidController.getInfo);

export default router;
