import { Request, Response } from "express";
import testchambersRepository from "../repositories/testchambers.repository";

class testchambers {
    public async getAll(req: Request, res: Response) {
        res.json(await testchambersRepository.getAll())
    }
    public async getMain(req: Request, res: Response) {
        res.json(await testchambersRepository.getMain())
    }
    public async getAdvanced(req: Request, res: Response) {
        res.json(await testchambersRepository.getAdvanced())
    }
    public async getChallenge(req: Request, res: Response) {
        res.json(await testchambersRepository.getChallenge())
    }
    public async getStillAliveBonus(req: Request, res: Response) {
        res.json(await testchambersRepository.getStillAliveBonus())
    }
}

export default new testchambers();