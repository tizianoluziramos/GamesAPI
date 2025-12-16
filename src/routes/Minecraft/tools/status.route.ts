import { Router } from "express";
import statusController from "../../../controllers/Minecraft/tools/status.controller";
import uuidController from "../../../controllers/Minecraft/tools/uuid.controller";
import serverstatusController from "../../../controllers/Minecraft/tools/serverstatus.controller";

const router = Router();

router.get("/", statusController.getRoutes);
router.get("/server/", serverstatusController.getServerStatus);
router.get("/server/:ip", serverstatusController.getServerStatus);
router.get("/server/:ip/:port", serverstatusController.getServerStatus);
router.get("/player", uuidController.getInfo);
router.get("/player/:id", uuidController.getInfo);

export default router;
