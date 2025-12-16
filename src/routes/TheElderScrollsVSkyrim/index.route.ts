import { Router } from "express";
import indexController from "../../controllers/TheElderScrollsVSkyrim/index.controller";
import characters from "./characters.route";
import weapons from "./weapons.route";
import quests from "./quests.route";
import locations from "./locations.route";
import books from "./books.route";
import spells from "./spells.route";

const index = Router();

index.get("/", indexController.getRoutes);
index.use("/characters", characters);
index.use("/weapons", weapons);
index.use("/quests", quests);
index.use("/locations", locations);
index.use("/books", books);
index.use("/spells", spells);

export default index;
