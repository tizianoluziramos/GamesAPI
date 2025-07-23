import { Request, Response, RequestHandler } from "express";
import creditsRepositories from "../repositories/credits.repository";

class creditsController {
  public getFiltered: RequestHandler = async (req: Request, res: Response) => {
    const data = await creditsRepositories.getAll();
    const queryKeys = Object.keys(req.query);

    if (queryKeys.length === 0) {
      res.json(data);
    }

    const validKeys = queryKeys.filter((key) => key in data.credits);
    const result: Partial<Record<keyof typeof data.credits, unknown>> = {};

    for (const key of validKeys) {
      result[key as keyof typeof data.credits] =
        data.credits[key as keyof typeof data.credits];
    }

    res.json(result);
  };
  public getCopyright: RequestHandler = async (req: Request, res: Response) => {
    res.json(await creditsRepositories.getCopyright());
  };
  public getCreator: RequestHandler = async (req: Request, res: Response) => {
    res.json(await creditsRepositories.getCreator());
  };
  public getDevelopment: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    res.json(await creditsRepositories.getDevelopment());
  };
  public getFontsDeliveredFrom: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    res.json(await creditsRepositories.getFontsDeliveredFrom());
  };
  public getLocations: RequestHandler = async (req: Request, res: Response) => {
    res.json(await creditsRepositories.getLocalizations());
  };
  public getSoundEffectContributors: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    res.json(await creditsRepositories.getSoundEffectContributors());
  };
  public getSoundEffectSourcedFrom: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    res.json(await creditsRepositories.getSoundEffectsSourcedFrom());
  };
  public getSpecialThanks: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    res.json(await creditsRepositories.getSpecialThanks());
  };
  public getTeams: RequestHandler = async (req: Request, res: Response) => {
    res.json(await creditsRepositories.getTeams());
  };
  public getTechnologies: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    res.json(await creditsRepositories.getTechnologies());
  };
}

export default new creditsController();
