import { Router } from "express";
import assetsController from "../../controllers/assets.controller";

const router = Router();

router.get("/", assetsController.getAll);

router.get("/fonts", assetsController.getInGameFonts);

router.get("/soundeffects", assetsController.getSoundEffectsController);

router.get("/soundeffects/id/:id/", assetsController.getSoundEffectsController);
router.get(
  "/soundeffects/name/:name",
  assetsController.getSoundEffectsController
);

router.get(
  "/soundeffects/id/:id/name/:name",
  assetsController.getSoundEffectsController
);

export default router;
