import { Router } from "express";
import routes from "../controllers/index.controller";
import characters from "./characters.route";
import locations from "./locations.route";
import items from "./items.route";
import endings from "./endings.route";

const index = Router();

index.get("/", routes.getAll);
index.use("/characters", characters);
index.use("/locations", locations);
index.use("/items", items);
index.use("/endings", endings);

export default index;
