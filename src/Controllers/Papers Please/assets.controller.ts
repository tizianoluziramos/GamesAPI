import { Request, Response, RequestHandler, ErrorRequestHandler } from "express";
import assetsRepositories from "repositories/Papers Please/assets.repository";

export default class assetsController {
  public static getAll: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    res.json(await assetsRepositories.getAll());
  };
  public static getInGameFonts: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    res.json(await assetsRepositories.getInGameFonts());
  };
  public static getSoundEffectsController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const idParam = req.params.id;
      const nameParam = req.params.name;

      const id = idParam ? parseInt(idParam as string, 10) : undefined;
      const name = nameParam ? String(nameParam) : undefined;

      const result = await assetsRepositories.getSoundEffects(id, name);

      if (!result) {
        res.status(404).json({
          error: "No sound effect found.",
        });
        return;
      }

      res.json(result);
    } catch (error) {
      logger.error(`Error while getting data: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
