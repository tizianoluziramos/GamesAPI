import { Request, Response } from "express";
import loginPacketRepository from "../repositories/loginPacket.repository";

class loginPacket {
  public async getAll(req: Request, res: Response) {
    const data = await loginPacketRepository.getAll();
    res.json(data);
  }
}

export default new loginPacket();
