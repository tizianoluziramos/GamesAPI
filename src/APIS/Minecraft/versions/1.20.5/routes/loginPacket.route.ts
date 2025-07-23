import { Router } from "express";
import loginPacketController from "../controllers/loginPacket.controller";

const loginPacket = Router();

loginPacket.get("/", loginPacketController.getAll);

export default loginPacket;
