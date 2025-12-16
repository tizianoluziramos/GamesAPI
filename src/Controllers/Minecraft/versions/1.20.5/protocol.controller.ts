import { Request, Response } from "express";
import protocolRepository from "../../../../repositories/Minecraft/versions/1.20.5/protocol.repository";

class protocol {
  public async getAll(req: Request, res: Response) {
    res.json(await protocolRepository.getAll());
  }
}

export default new protocol();
