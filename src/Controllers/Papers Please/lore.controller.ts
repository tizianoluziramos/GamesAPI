import { Request, Response } from "express";
import LoreRepository from "repositories/Papers Please/lore.repository";

class LoreController {
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const lore = await LoreRepository.getAll();
      res.json(lore);
    } catch (error) {
      res.status(500).json({ message: "Error fetching lore data", error });
    }
  }

  public async getByLanguage(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.params.lang;
      const loreAll = await LoreRepository.getAll();
      if (!(lang in loreAll)) {
        res.status(400).json({ message: `Invalid language parameter: ${lang}` });
        return;
      }

      const loreLang = await LoreRepository.getByLanguage(lang);
      if (!loreLang) {
        res.status(404).json({ message: `Lore not found for language: ${lang}` });
        return;
      }

      res.json(loreLang);
    } catch (error) {
      res.status(500).json({ message: "Error fetching lore by language", error });
    }
  }

  public async getByLanguageAndIDs(req: Request, res: Response): Promise<void> {
    try {
      const lang = req.params.lang;
      const idsParam = req.params.id;

      const loreAll = await LoreRepository.getAll();
      if (!(lang in loreAll)) {
        res.status(400).json({ message: `Invalid language parameter: ${lang}` });
        return;
      }

      const loreLang = await LoreRepository.getByLanguage(lang);
      if (!loreLang) {
        res.status(404).json({ message: `Lore not found for language: ${lang}` });
        return;
      }

      let secciones = loreLang.secciones;
      if (idsParam) {
        const ids = idsParam.split("&").map((id) => parseInt(id)).filter((n) => !isNaN(n));
        if (ids.length === 0) {
          res.status(400).json({ message: "No valid IDs provided." });
          return;
        }
        secciones = secciones.filter((s) => ids.includes(s.id));
        if (secciones.length === 0) {
          res.status(404).json({ message: "No sections found for provided IDs." });
          return;
        }
        res.json(secciones);
      } else {
        res.json(loreLang);
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching lore sections", error });
    }
  }

  public async supportedLenguages(req: Request, res: Response): Promise<void> {
    res.json({
      supportedConversions: ["json"],
    });
  }
}

export default new LoreController();
