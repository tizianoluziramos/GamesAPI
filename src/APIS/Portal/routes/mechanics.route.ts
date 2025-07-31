import { Router } from "express";
import mechanicsController from "../controllers/mechanics.controller";

const mechanics = Router();

mechanics.get("/", mechanicsController.getAll)
mechanics.get("/name/:name", mechanicsController.searchByName)

export default mechanics;