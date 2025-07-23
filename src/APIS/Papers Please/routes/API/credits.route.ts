import express from "express";
import creditsController from "../../controllers/credits.controller";

const router = express.Router();

router.get("/", creditsController.getFiltered);

router.get("/creator", creditsController.getCreator);
router.get("/copyright", creditsController.getCopyright);
router.get("/development", creditsController.getDevelopment);
router.get("/fonts", creditsController.getFontsDeliveredFrom);
router.get("/localizations", creditsController.getLocations);
router.get("/sound-contributors", creditsController.getSoundEffectContributors);
router.get("/sound-source", creditsController.getSoundEffectSourcedFrom);
router.get("/special-thanks", creditsController.getSpecialThanks);
router.get("/teams", creditsController.getTeams);
router.get("/technologies", creditsController.getTechnologies);

export default router;
