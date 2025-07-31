import { Router } from "express";
import indexController from "./controllers/index.controller";
import characters from "./routes/characters.route";
import weapons from "./routes/weapons.route";
import quests from "./routes/quests.route";
import locations from "./routes/locations.route";
import books from "./routes/books.route";
import spells from "./routes/spells.route";

const index = Router();

index.get("/", indexController.getRoutes);
index.use("/characters", characters);
index.use("/weapons", weapons);
index.use("/quests", quests);
index.use("/locations", locations);
index.use("/books", books);
index.use("/spells", spells);

export default index;
