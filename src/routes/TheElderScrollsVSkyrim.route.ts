import { Router } from "express";

import indexController from "../controllers/TheElderScrollsVSkyrim/index.controller";
import booksController from "../controllers/TheElderScrollsVSkyrim/books.controller";
import charactersController from "../controllers/TheElderScrollsVSkyrim/characters.controller";
import locationsController from "../controllers/TheElderScrollsVSkyrim/locations.controller";
import questsController from "../controllers/TheElderScrollsVSkyrim/quests.controller";
import spellsController from "../controllers/TheElderScrollsVSkyrim/spells.controller";
import weaponsController from "../controllers/TheElderScrollsVSkyrim/weapons.controller";

const skyrimRouter = Router();

skyrimRouter.get("/", indexController.getRoutes);

skyrimRouter.get("/characters", charactersController.getAll);
skyrimRouter.get("/characters/pageid/:pageid", charactersController.getByPageID);

skyrimRouter.get("/weapons", weaponsController.getAll);
skyrimRouter.get("/weapons/:language", weaponsController.getByLanguage);
skyrimRouter.get("/weapons/:language/:name", weaponsController.getByName);

skyrimRouter.get("/quests", questsController.getAll);
skyrimRouter.get("/quests/name/:name", questsController.getByName);
skyrimRouter.get("/quests/location/:location", questsController.filterByLocation);
skyrimRouter.get("/quests/hold/:hold", questsController.filterByHold);

skyrimRouter.get("/locations", locationsController.getAll);
skyrimRouter.get("/locations/locations", locationsController.getLocations);
skyrimRouter.get("/locations/images", locationsController.getImages);
skyrimRouter.get("/locations/externallinks", locationsController.getExternalLinks);

skyrimRouter.get("/books", booksController.getAll);
skyrimRouter.get("/books/title/:title", booksController.getByTitle);
skyrimRouter.get("/books/author/:author", booksController.filterByAuthor);

skyrimRouter.get("/spells", spellsController.getAll);
skyrimRouter.get("/spells/name/:name", spellsController.getByName);
skyrimRouter.get("/spells/school/:school", spellsController.filterBySchool);

export default skyrimRouter;
