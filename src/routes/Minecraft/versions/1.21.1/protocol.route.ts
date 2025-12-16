import { Router } from "express";
import protocolController from "../../../../controllers/Minecraft/versions/1.21.1/protocol.controller";

const protocol = Router();

protocol.get("/", protocolController.getAll);

export default protocol;
