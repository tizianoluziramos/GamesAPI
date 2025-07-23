import { Request, Response } from "express"
import gameinfoRepository from "../repositories/gameinfo.repository"

class reception {
    public async getAll(req: Request, res: Response) {
        res.json(await gameinfoRepository.reception.getAll());
    }
    public AggregatedScores = class {
        public static async getAll(req: Request, res: Response) {
            res.json(await gameinfoRepository.reception.AggregatedScores.getAll());
        }
        public static async getGameRankings(req: Request, res: Response) {
            res.json(await gameinfoRepository.reception.AggregatedScores.getGameRankings());
        }
        public static async getMetacritic(req: Request, res: Response) {
            res.json(await gameinfoRepository.reception.AggregatedScores.getMetacritic());
        }
    }
    public async getReviewScores(req: Request, res: Response) {
        res.json(await gameinfoRepository.reception.getReviewScores());
    }
    public async getGeneralReception(req: Request, res: Response) {
        res.json(await gameinfoRepository.reception.getGeneralReception());
    }
}

class gameinfo {
    public reception = new reception();
    public async getAll(req: Request, res: Response) {
        res.json(await gameinfoRepository.getAll());
    } 
    public async getTitle(req: Request, res: Response) {
        res.json(await gameinfoRepository.getTitle());
    }
    public async getDeveloper(req: Request, res: Response) {
        res.json(await gameinfoRepository.getDeveloper());
    }
    public async getPublisher(req: Request, res: Response) {
        res.json(await gameinfoRepository.getPublisher());
    }
    public async getDirectors(req: Request, res: Response) {
        res.json(await gameinfoRepository.getDirectors());
    }
    public async getProducers(req: Request, res: Response) {
        res.json(await gameinfoRepository.getProducers());
    }
    public async getWriters(req: Request, res: Response) {
        res.json(await gameinfoRepository.getWriters());
    }
    public async getComposer(req: Request, res: Response) {
        res.json(await gameinfoRepository.getComposer());
    }
    public async getSeries(req: Request, res: Response) {
        res.json(await gameinfoRepository.getSeries());
    }
    public async getEngine(req: Request, res: Response) {
        res.json(await gameinfoRepository.getEngine());
    }
    public async getPlatforms(req: Request, res: Response) {
        res.json(await gameinfoRepository.getPlatforms());
    }
    public async getReleaseDates(req: Request, res: Response) {
        res.json(await gameinfoRepository.getReleaseDates());
    }
    public async getGenre(req: Request, res: Response) {
        res.json(await gameinfoRepository.getGenre());
    }
    public async getModes(req: Request, res: Response) {
        res.json(await gameinfoRepository.getModes());
    }
    public async getDescription(req: Request, res: Response) {
        res.json(await gameinfoRepository.getDescription());
    }
    public async getPlotSummary(req: Request, res: Response) {
        res.json(await gameinfoRepository.getPlotSummary());
    }
    public async getIosVersionSummary(req: Request, res: Response) {
        res.json(await gameinfoRepository.getIosVersionSummary());
    }
    public async getDevelopment(req: Request, res: Response) {
        res.json(await gameinfoRepository.getDevelopment());
    }
}

export default new gameinfo();