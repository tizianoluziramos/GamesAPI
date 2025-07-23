import { Request, Response, RequestHandler } from "express";
import recordRepositories from "../repositories/record.repository";

class recordController {
  public static getAll: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    if (req.params.lang) {
      const data = await recordRepositories.getAll(req.params.lang);
      res.json(data);
    } else {
      res.json(await recordRepositories.getAvalibleLanguages());
    }
  };
  public static getByPlace: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { lang, place } = req.params;

      if (lang && place) {
        if (!place) {
          return res.status(400).json({ error: "'place' must be a number" });
        }

        const data = await recordRepositories.getByPlace(lang, place);
        return res.json(data);
      }

      const languages = await recordRepositories.getAvalibleLanguages();
      return res.json(languages);
    } catch (error) {
      console.error("Error in getByPlace controller:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public static getAllPlaces: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const { lang } = req.params;
    if (lang) {
      const data = await recordRepositories.getAllPlaces(lang);
      return res.json(data);
    }
  };

  public static getPlaceByID: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const { lang, id } = req.params;

    if (!lang || !id) {
      return res.status(400).json({ error: "'lang' and 'id' are required" });
    }

    try {
      const result = await recordRepositories.getById(lang, id);

      if (!result) {
        return res.status(404).json({ error: "Place not found" });
      }

      return res.send(result);
    } catch (error) {
      console.error("Error in getPlaceByID:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default recordController;
