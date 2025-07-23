import { Router } from "express";
import questsController from "../controllers/quests.controller";

const quests = Router();

quests.get("/", questsController.getAll);
quests.get("/name/:name", questsController.getByName);
quests.get("/location/:location", questsController.filterByLocation);
quests.get("/hold/:hold", questsController.filterByHold);

export default quests;
