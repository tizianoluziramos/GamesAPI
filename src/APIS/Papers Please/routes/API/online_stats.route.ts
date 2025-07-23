import { Router } from "express";
import onlineStatsController from "../../controllers/online_stats.controller";

const router = Router();

router.get("/", onlineStatsController.showStores);
router.get("/:game", onlineStatsController.showOptions);
router.get("/:game/archivements", onlineStatsController.getSteamArchivenments);
router.get("/:game/online_players", onlineStatsController.getActivePlayers);

export default router;
