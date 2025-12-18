import { Router } from "express";
import uuidController from "../../controllers/Minecraft/tools/player.controller";
import statusController from "../../controllers/Minecraft/tools/serverinfo.controller";

const router = Router();

router.get("/server/:ip", statusController.getServerInfo);
router.get("/server/:ip/:port", statusController.getServerInfo);
router.get("/player/:id", uuidController.getInfo);

export default router;
