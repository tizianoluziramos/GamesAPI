import { Router } from "express";
import walkthroughController from "../controllers/walkthrough.controller";

const walkthrough = Router();

walkthrough.get("/", walkthroughController.getAll);
walkthrough.get("/name/:name", walkthroughController.getByName);
walkthrough.get("/url/:url", walkthroughController.getByUrl);

export default walkthrough;
