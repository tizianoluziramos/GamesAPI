import { Request, Response } from "express"
import charactersRepository from "../repositories/characters.repository"

class characters {
    public async getAll(req: Request, res: Response) {
        res.json(await charactersRepository.getAll())
    }
    public async getById(req: Request, res: Response) {
        const { id } = req.params;
        res.json(await charactersRepository.getById(parseInt(id)))
    }
    public async getByName(req: Request, res: Response) {
        const { name } = req.params;
        res.json(await charactersRepository.getByName(name))
    } 
}

export default new characters();