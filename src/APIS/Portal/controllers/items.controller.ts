import { Request, Response } from "express";
import itemsRepository from "../repositories/items.repository";

class items {
    public async getAll(req: Request, res: Response) {
        res.json(await itemsRepository.getAll());
    }

    public async searchByName(req: Request, res: Response) {
        const { name } = req.params;
        res.json(await itemsRepository.searchByName(name));
    }

    public async filterByInteractable(req: Request, res: Response) {
        const interactable = Boolean(req.params.interactable);
        res.json(await itemsRepository.filterByInteractable(interactable));
    }

    public async filterByPortable(req: Request, res: Response) {
        const portable = Boolean(req.params.portable);
        res.json(await itemsRepository.filterByPortable(portable));
    }
}

export default new items();