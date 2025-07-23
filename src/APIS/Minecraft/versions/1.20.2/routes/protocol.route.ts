import { Router } from "express";
import protocolController from "../controllers/protocol.controller";

const protocol = Router();

protocol.get("/", protocolController.getAll);

export default protocol;
