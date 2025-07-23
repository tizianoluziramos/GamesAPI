import { Request, Response } from "express"
import weaponsRepository from "../repositories/weapons.repository"

class weapons {
    public async getAll(req: Request, res: Response) {
        res.json(await weaponsRepository.getAll())
    }
    public async getHandguns(req: Request, res: Response) {
        res.json(await weaponsRepository.getHandguns())
    }
    public async getLaunchers(req: Request, res: Response) {
        res.json(await weaponsRepository.getLaunchers())
    }
    public async getMachineGuns(req: Request, res: Response) {
        res.json(await weaponsRepository.getMachineGuns())
    }
    public async getRifles(req: Request, res: Response) {
        res.json(await weaponsRepository.getRifles())
    }
    public async getShotguns(req: Request, res: Response) {
        res.json(await weaponsRepository.getShotguns())
    }
    public async getSubmachineHandGuns(req: Request, res: Response) {
        res.json(await weaponsRepository.getSubmachineHandGuns())
    }
}

export default new weapons();