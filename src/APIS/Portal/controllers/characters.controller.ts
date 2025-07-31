import { Request, Response } from "express";
import charactersRepository from "../repositories/characters.repository";

class characters {
    public async getAll(req: Request, res: Response) {
        res.json(await charactersRepository.getAll());
    }
}

export default new characters();