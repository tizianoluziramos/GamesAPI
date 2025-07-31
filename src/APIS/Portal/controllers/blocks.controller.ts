import { Request, Response } from "express";
import blocksRepository from "../repositories/blocks.repository";

class blocks {
    public async getAll(req: Request, res: Response) {
        res.json(await blocksRepository.getAll());
    }
    public async searchByName(req: Request, res: Response) {
        const { name } = req.params;
        res.json(await blocksRepository.searchByName(name));
    }
    public async filterByInteractable(req: Request, res: Response) {
        const interactable = Boolean(req.params.interactable);
        res.json(await blocksRepository.filterByInteractable(interactable));
    }
    public async filterByPortalSurface(req: Request, res: Response) {
        const portalsurface = Boolean(req.params.interactable);
        res.json(await blocksRepository.filterByPortalSurface(portalsurface));
    }
}

export default new blocks();