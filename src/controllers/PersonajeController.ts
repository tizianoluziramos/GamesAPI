import { Request, Response, RequestHandler } from "express";
import personajesRepositories from "../repositories/personajesRepositories";

export default class personajesController {
  public static getFiltered: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const { id, name, nationality, type, roles } = req.query;

    try {
      if (typeof id === "string") {
        const personaje = await personajesRepositories.getById(id);
        if (!personaje) {
          return res.status(404).json({ message: "Personaje not found" });
        }
        return res.json(personaje);
      }

      if (typeof name === "string" && !nationality && !type && !roles) {
        const personaje = await personajesRepositories.getByName(name);
        if (!personaje) {
          return res.status(404).json({ message: "Personaje not found" });
        }
        return res.json(personaje);
      }

      if (typeof nationality === "string" && !name && !type && !roles) {
        const personajes = await personajesRepositories.getByNationality(
          nationality
        );
        return res.json(personajes);
      }

      if (typeof type === "string" && !name && !nationality && !roles) {
        const personajes = await personajesRepositories.getByType(type);
        return res.json(personajes);
      }

      if (
        (typeof roles === "string" || Array.isArray(roles)) &&
        !name &&
        !type &&
        !nationality
      ) {
        const parsedRoles = Array.isArray(roles)
          ? roles.map((r) => r.toString())
          : [roles.toString()];

        const personajes = await personajesRepositories.getByRoles(parsedRoles);
        return res.json(personajes);
      }

      let personajes = await personajesRepositories.getAll();

      if (typeof name === "string") {
        personajes = personajes.filter((p) =>
          p.name.toLowerCase().includes(name.toLowerCase())
        );
      }

      if (typeof nationality === "string") {
        personajes = personajes.filter(
          (p) => p.nationality.toLowerCase() === nationality.toLowerCase()
        );
      }

      if (typeof type === "string") {
        personajes = personajes.filter(
          (p) => p.type.toLowerCase() === type.toLowerCase()
        );
      }

      if (roles) {
        const parsedRoles = Array.isArray(roles)
          ? roles.map((r) => r.toString())
          : [roles.toString()];

        personajes = personajes.filter((p) =>
          parsedRoles.every((role) => p.roles.includes(role))
        );
      }

      return res.json(personajes);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getPersonajes: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    try {
      const personajes = await personajesRepositories.getAll();
      return res.json(personajes);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getById: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const id = req.query.id;

    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid or missing ID" });
    }

    try {
      const personaje = await personajesRepositories.getById(id);

      if (!personaje) {
        return res.status(404).json({ message: "Personaje not found" });
      }

      return res.json(personaje);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getByName: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const name = req.query.name;

    if (typeof name !== "string") {
      return res.status(400).json({ message: "Invalid or missing name" });
    }

    try {
      const personaje = await personajesRepositories.getByName(name);

      if (!personaje) {
        return res.status(404).json({ message: "Personaje not found" });
      }

      return res.json(personaje);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getByNationality: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const nationality = req.query.nationality;

    if (typeof nationality !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid or missing nationality" });
    }

    try {
      const personajes = await personajesRepositories.getByNationality(
        nationality
      );
      return res.json(personajes);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getByType: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const type = req.query.type;

    if (typeof type !== "string") {
      return res.status(400).json({ message: "Invalid or missing type" });
    }

    try {
      const personajes = await personajesRepositories.getByType(type);
      return res.json(personajes);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public static getByRoles: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const roles = req.query.roles;

    let parsedRoles: string[];

    if (Array.isArray(roles)) {
      parsedRoles = roles.map((r) => r.toString());
    } else if (typeof roles === "string") {
      parsedRoles = [roles];
    } else {
      return res.status(400).json({ message: "Invalid or missing roles" });
    }

    try {
      const personajes = await personajesRepositories.getByRoles(parsedRoles);
      return res.json(personajes);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
