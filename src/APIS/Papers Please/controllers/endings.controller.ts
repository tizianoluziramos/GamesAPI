import { Request, Response } from "express";
import FinalesRepository from "../repositories/endings.repository";

export class FinalesController {
  private static getLang(req: Request): string {
    return req.params.lang?.toLowerCase() || "spanish";
  }

  public static async getAvailableLanguages(req: Request, res: Response) {
    res.json(await FinalesRepository.getAvailableLanguages());
  }

  public static async getFiltered(req: Request, res: Response) {
    try {
      const lang = FinalesController.getLang(req);
      let resultados = await FinalesRepository.getAll(lang);

      const {
        id,
        titulo,
        tipo,
        textoCondiciones,
        textoConsecuencias,
        dia,
        ezic,
      } = req.query;

      if (typeof id === "string") {
        resultados = resultados.filter((f) => f.id === id);
      }

      if (typeof titulo === "string") {
        resultados = resultados.filter(
          (f) => f.titulo.toLowerCase() === titulo.toLowerCase()
        );
      }

      if (typeof tipo === "string") {
        resultados = resultados.filter((f) => f.tipo === tipo);
      }

      if (typeof textoCondiciones === "string") {
        resultados = resultados.filter((f) =>
          f.condiciones.some((c) =>
            c.toLowerCase().includes(textoCondiciones.toLowerCase())
          )
        );
      }

      if (typeof textoConsecuencias === "string") {
        resultados = resultados.filter((f) =>
          f.consecuencias.some((c) =>
            c.toLowerCase().includes(textoConsecuencias.toLowerCase())
          )
        );
      }

      if (typeof dia === "string") {
        const diaNum = Number(dia);
        if (isNaN(diaNum)) {
          res
            .status(400)
            .json({ error: "El parámetro 'dia' debe ser un número." });
          return;
        }
        resultados = resultados.filter((f) => f.dia === diaNum);
      }

      if (typeof ezic === "string") {
        if (ezic !== "true" && ezic !== "false") {
          res.status(400).json({
            error: "El parámetro 'ezic' debe ser 'true' o 'false'.",
          });
          return;
        }
        const ezicBool = ezic === "true";
        resultados = resultados.filter((f) => f.ezic === ezicBool);
      }

      res.json(resultados);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al filtrar finales." });
    }
  }

  public static async filterByConsecuencias(req: Request, res: Response) {
    try {
      const { lang, texto } = req.params;
      if (!texto) {
        res.status(400).json({ error: "Falta parámetro 'texto'." });
        return;
      }

      const resultados = await FinalesRepository.filterByConsecuencias(
        lang,
        texto
      );
      res.json(resultados);
    } catch (err) {
      res.status(500).json({ error: "Error al filtrar por consecuencias." });
    }
  }

  public static async filterByCondiciones(req: Request, res: Response) {
    try {
      const { lang, texto } = req.params;
      if (!texto) {
        res.status(400).json({ error: "Falta parámetro 'texto'." });
        return;
      }

      const resultados = await FinalesRepository.filterByCondiciones(
        lang,
        texto
      );
      res.json(resultados);
    } catch (err) {
      res.status(500).json({ error: "Error al filtrar por condiciones." });
    }
  }

  public static async filterByDia(req: Request, res: Response) {
    try {
      const { lang, dia } = req.params;
      const diaNumero = Number(dia);
      if (isNaN(diaNumero)) {
        res
          .status(400)
          .json({ error: "El parámetro 'dia' debe ser un número." });
        return;
      }

      const resultados = await FinalesRepository.filterByDia(lang, diaNumero);
      res.json(resultados);
    } catch (err) {
      res.status(500).json({ error: "Error al filtrar por día." });
    }
  }

  public static async filterByTipo(req: Request, res: Response) {
    try {
      const { lang, tipo } = req.params;

      const resultados = await FinalesRepository.filterByTipo(
        lang,
        tipo as string
      );
      res.json(resultados);
    } catch (err) {
      res.status(500).json({ error: "Error al filtrar por tipo." });
    }
  }

  public static async filterByEzic(req: Request, res: Response) {
    try {
      const { lang, ezic } = req.params;
      if (ezic !== "true" && ezic !== "false") {
        res
          .status(400)
          .json({ error: "El parámetro 'ezic' debe ser 'true' o 'false'." });
        return;
      }

      const ezicBool = ezic === "true";
      const resultados = await FinalesRepository.filterByEzic(lang, ezicBool);
      res.json(resultados);
    } catch (err) {
      res.status(500).json({ error: "Error al filtrar por EZIC." });
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const lang = this.getLang(req);
      const { id } = req.params;
      const final = await FinalesRepository.getById(lang, id);
      if (!final) {
        res.status(404).json({ error: "Final no encontrado." });
        return;
      }
      res.json(final);
    } catch (err) {
      res.status(500).json({ error: "Error al buscar el final por ID." });
    }
  }

  public static async getByTitulo(req: Request, res: Response) {
    try {
      const lang = this.getLang(req);
      const { titulo } = req.params;
      const final = await FinalesRepository.getByTitulo(lang, titulo);
      if (!final) {
        res.status(404).json({ error: "Final no encontrado por título." });
      }
      res.json(final);
    } catch (err) {
      res.status(500).json({ error: "Error al buscar el final por título." });
    }
  }
}
