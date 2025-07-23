import { Request, Response, RequestHandler } from "express";
import paisesRepository from "../repositories/countries.repository";

class PaisesController {
  public static getFiltered: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const { nombre, ciudad } = req.query;

    try {
      if (typeof nombre === "string") {
        const pais = await paisesRepository.getByNombre(nombre);
        if (!pais) {
          return res.status(404).json({ message: "País no encontrado" });
        }
        return res.json(pais);
      }

      if (typeof ciudad === "string") {
        const paises = await paisesRepository.filterByCiudad(ciudad);
        return res.json(paises);
      }

      const paises = await paisesRepository.getAll();
      return res.json(paises);
    } catch (error) {
      console.error("Error en getFiltered:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  public static getAll: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    try {
      const paises = await paisesRepository.getAll();
      return res.json(paises);
    } catch (error) {
      console.error("Error en getAll:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  public static getByNombre: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const { name } = req.params;
    try {
      const pais = await paisesRepository.getByNombre(name);
      if (!pais) {
        return res.status(404).json({ message: "País no encontrado" });
      }
      return res.json(pais);
    } catch (error) {
      console.error("Error en getByNombre:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  public static filterByCiudad: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const { city } = req.params;
    try {
      const paises = await paisesRepository.filterByCiudad(city);
      return res.json(paises);
    } catch (error) {
      console.error("Error en filterByCiudad:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}

export default PaisesController;
