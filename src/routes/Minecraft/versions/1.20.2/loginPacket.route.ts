import { Router } from "express";
import loginPacketController from "../../../../controllers/Minecraft/versions/1.20.2/loginPacket.controller";

const loginPacket = Router();

loginPacket.get("/", loginPacketController.getAll);

export default loginPacket;
