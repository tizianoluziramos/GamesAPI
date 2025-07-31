import { Request, Response, RequestHandler } from "express";
import personajesRepositories from "../repositories/characters.repository";

export default class personajesController {
  public static getFiltered: RequestHandler | any = async (req: Request, res: Response) => {
    const { id, name, nationality, type, role } = req.query;
    const lang = req.params.lang?.toLowerCase() || "spanish";

    try {
      if (typeof id === "string") {
        const personaje = await personajesRepositories.getById(lang, id);
        if (!personaje) return res.status(404).json({ message: "Personaje not found" });
        return res.json(personaje);
      }

      if (typeof name === "string" && !nationality && !type && !role) {
        const personaje = await personajesRepositories.getByName(lang, name);
        if (!personaje) return res.status(404).json({ message: "Personaje not found" });
        return res.json(personaje);
      }

      if (typeof nationality === "string" && !name && !type && !role) {
        const personajes = await personajesRepositories.getByNationality(lang, nationality);
        return res.json(personajes);
      }

      if (typeof type === "string" && !name && !nationality && !role) {
        const personajes = await personajesRepositories.getByType(lang, type);
        return res.json(personajes);
      }

      if ((typeof role === "string" || Array.isArray(role)) && !name && !type && !nationality) {
        const parsedRoles = Array.isArray(role) ? role.map((r) => r.toString()) : [role.toString()];
        const personajes = await personajesRepositories.getByRoles(lang, parsedRoles);
        return res.json(personajes);
      }

      let personajes = await personajesRepositories.getAll(lang);

      if (typeof name === "string") {
        personajes = personajes.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
      }

      if (typeof nationality === "string") {
        personajes = personajes.filter((p) => p.nationality.toLowerCase() === nationality.toLowerCase());
      }

      if (typeof type === "string") {
        personajes = personajes.filter((p) => p.type.toLowerCase() === type.toLowerCase());
      }

      if (typeof role === "string") {
        personajes = personajes.filter((p) => p.roles.includes(role));
      }

      return res.json(personajes);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getPersonajes: RequestHandler | any = async (req: Request, res: Response) => {
    const lang = req.params.lang?.toLowerCase() || "spanish";
    try {
      const personajes = await personajesRepositories.getAll(lang);
      return res.json(personajes);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getById: RequestHandler | any = async (req: Request, res: Response) => {
    const { lang, id } = req.params;
    try {
      const personaje = await personajesRepositories.getById(lang, id);
      if (!personaje) return res.status(404).json({ message: "Personaje not found" });
      return res.json(personaje);
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getByName: RequestHandler | any = async (req: Request, res: Response) => {
    const { lang, name } = req.params;
    try {
      const personaje = await personajesRepositories.getByName(lang, name);
      if (!personaje) return res.status(404).json({ message: "Personaje not found" });
      return res.json(personaje);
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getByNationality: RequestHandler | any = async (req: Request, res: Response) => {
    const { lang, nationality } = req.params;
    try {
      const personajes = await personajesRepositories.getByNationality(lang, nationality);
      return res.json(personajes);
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getByType: RequestHandler | any = async (req: Request, res: Response) => {
    const { lang, type } = req.params;
    try {
      const personajes = await personajesRepositories.getByType(lang, type);
      return res.json(personajes);
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getByRoles: RequestHandler | any = async (req: Request, res: Response) => {
    const { lang, role } = req.params;
    try {
      const personajes = await personajesRepositories.getByRoles(lang, [role]);
      return res.json(personajes);
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getRandom: RequestHandler | any = async (req: Request, res: Response) => {
    const lang = req.params.lang?.toLowerCase() || "spanish";
    try {
      const personaje = await personajesRepositories.getRandom(lang);
      return res.status(200).json(personaje);
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getAvailableLanguages: RequestHandler | any = async (req: Request, res: Response) => {
    try {
      const langs = await personajesRepositories.getAvailableLanguages();
      return res.json({ languages: langs });
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  public static getAllLanguagesData: RequestHandler | any = async (req: Request, res: Response) => {
    try {
      const data = await personajesRepositories.getAllLanguagesData();
      return res.json(data);
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
