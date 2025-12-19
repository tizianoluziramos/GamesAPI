import { Router } from "express";

import { index } from "controllers/Portal/index.controller";
import blocksController from "controllers/Portal/blocks.controller";
import charactersController from "controllers/Portal/characters.controller";
import GameinfoController from "controllers/Portal/gameinfo.controller";
import itemsController from "controllers/Portal/items.controller";
import mechanicsController from "controllers/Portal/mechanics.controller";
import testchambersController from "controllers/Portal/testchambers.controller";
import walkthroughController from "controllers/Portal/walkthrough.controller";

const portal = Router();

portal.get("/", index.index);

portal.get("/gameinfo", GameinfoController.getAll);
portal.get("/gameinfo/platforms", GameinfoController.getPlatforms);
portal.get("/gameinfo/modes", GameinfoController.getModes);
portal.get("/gameinfo/languages", GameinfoController.getLanguages);

portal.get("/blocks", blocksController.getAll);
portal.get("/blocks/name/:name", blocksController.searchByName);
portal.get("/blocks/interactable/:interactable", blocksController.filterByInteractable);
portal.get("/blocks/portalsurface/:portalsurface", blocksController.filterByPortalSurface);

portal.get("/characters", charactersController.getAll);

portal.get("/items", itemsController.getAll);
portal.get("/items/name/:name", itemsController.searchByName);
portal.get("/items/interactable/:interactable", itemsController.filterByInteractable);
portal.get("/items/portable/:portable", itemsController.filterByPortable);

portal.get("/mechanics", mechanicsController.getAll);
portal.get("/mechanics/name/:name", mechanicsController.searchByName);

portal.get("/testchambers", testchambersController.getAll);
portal.get("/testchambers/main", testchambersController.getMain);
portal.get("/testchambers/advanced", testchambersController.getAdvanced);
portal.get("/testchambers/challenge", testchambersController.getChallenge);
portal.get("/testchambers/still-alive-bonus", testchambersController.getStillAliveBonus);

portal.get("/walkthrough", walkthroughController.getAll);
portal.get("/walkthrough/name/:name", walkthroughController.getByName);
portal.get("/walkthrough/url/:url", walkthroughController.getByUrl);

export default portal;
