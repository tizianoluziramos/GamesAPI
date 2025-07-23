import { Request, Response, RequestHandler } from "express";
import mecanicasRepositories from "../repositories/mechanics.repository";

class MecanicasController {
  private static getLanguage(req: Request): string {
    const lang = req.params.lang;
    if (typeof lang === "string") return lang.toLowerCase();
    return "spanish";
  }

  public static getAvalibleLenguages: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const langs = await mecanicasRepositories.getAvalibleLenguages();
    res.json(langs);
  };

  public static getFiltered: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const lang = this.getLanguage(req);

    const {
      // Para documentos
      tipoDocumento,
      campoDocumento,
      validacionDocumento,

      // Para eventos
      id_evento,
      nombreEvento,

      // Para penalizaciones
      tipoPenalizacion,
      razonPenalizacion,
    } = req.query;

    try {
      // Filtros documentos
      if (
        typeof tipoDocumento === "string" ||
        typeof campoDocumento === "string" ||
        typeof validacionDocumento === "string"
      ) {
        if (typeof tipoDocumento === "string") {
          const doc = await mecanicasRepositories.getDocumentoByTipo(
            lang,
            tipoDocumento
          );
          if (!doc)
            return res.status(404).json({ message: "Documento no encontrado" });
          return res.json(doc);
        }
        if (typeof campoDocumento === "string") {
          const docs = await mecanicasRepositories.filterDocumentosByCampo(
            lang,
            campoDocumento
          );
          return res.json(docs);
        }
        if (typeof validacionDocumento === "string") {
          const docs = await mecanicasRepositories.filterDocumentosByValidacion(
            lang,
            validacionDocumento
          );
          return res.json(docs);
        }
      }

      // Filtros eventos
      if (typeof id_evento === "string") {
        const evento = await mecanicasRepositories.getEventoById(
          lang,
          id_evento
        );
        if (!evento)
          return res.status(404).json({ message: "Evento no encontrado" });
        return res.json(evento);
      }

      if (typeof nombreEvento === "string") {
        const eventos = await mecanicasRepositories.filterEventosByNombre(
          lang,
          nombreEvento
        );
        return res.json(eventos);
      }

      // Filtros penalizaciones
      if (typeof tipoPenalizacion === "string") {
        const penalizaciones =
          await mecanicasRepositories.filterPenalizacionesByTipo(
            lang,
            tipoPenalizacion
          );
        return res.json(penalizaciones);
      }

      if (typeof razonPenalizacion === "string") {
        const penalizaciones =
          await mecanicasRepositories.filterPenalizacionesByRazon(
            lang,
            razonPenalizacion
          );
        return res.json(penalizaciones);
      }

      // Si no hay filtros específicos, devuelve todo
      const mecanicas = await mecanicasRepositories.getByLanguage(lang);
      if (!mecanicas)
        return res.status(404).json({ message: "Idioma no encontrado" });

      return res.json(mecanicas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  public static getAll: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const lang = this.getLanguage(req);

    try {
      const mecanicas = await mecanicasRepositories.getByLanguage(lang);
      if (!mecanicas)
        return res.status(404).json({ message: "Idioma no encontrado" });
      return res.json(mecanicas);
    } catch (error) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  public static getDocumentos: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const lang = this.getLanguage(req);
    const { tipo, campo, validacion } = req.params;

    try {
      if (tipo) {
        const doc = await mecanicasRepositories.getDocumentoByTipo(lang, tipo);
        if (!doc)
          return res.status(404).json({ message: "Documento no encontrado" });
        return res.json(doc);
      }

      if (campo) {
        const docs = await mecanicasRepositories.filterDocumentosByCampo(
          lang,
          campo
        );
        return res.json(docs);
      }

      if (validacion) {
        const docs = await mecanicasRepositories.filterDocumentosByValidacion(
          lang,
          validacion
        );
        return res.json(docs);
      }

      // Si no hay params, devuelve todos los documentos
      const documentos = await mecanicasRepositories.getDocumentos(lang);
      return res.json(documentos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  public static getReglas: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const lang = this.getLanguage(req);

    try {
      const reglas = await mecanicasRepositories.getReglas(lang);
      return res.json(reglas);
    } catch {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  public static getEventos: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const lang = this.getLanguage(req);
    const { id_evento, nombre } = req.params;

    try {
      if (typeof id_evento === "string") {
        const evento = await mecanicasRepositories.getEventoById(
          lang,
          id_evento
        );
        if (!evento)
          return res.status(404).json({ message: "Evento no encontrado" });
        return res.json(evento);
      }

      if (typeof nombre === "string") {
        const eventos = await mecanicasRepositories.filterEventosByNombre(
          lang,
          nombre
        );
        return res.json(eventos);
      }

      const eventos = await mecanicasRepositories.getEventos(lang);
      return res.json(eventos);
    } catch {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  public static getPenalizaciones: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const lang = this.getLanguage(req);
    const { tipo, razon } = req.params;

    try {
      if (typeof tipo === "string") {
        const penalizaciones =
          await mecanicasRepositories.filterPenalizacionesByTipo(lang, tipo);
        return res.json(penalizaciones);
      }

      if (typeof razon === "string") {
        const penalizaciones =
          await mecanicasRepositories.filterPenalizacionesByRazon(lang, razon);
        return res.json(penalizaciones);
      }

      const penalizaciones = await mecanicasRepositories.getPenalizaciones(
        lang
      );
      return res.json(penalizaciones);
    } catch {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  public static getEstadisticasJugador: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const lang = this.getLanguage(req);

    try {
      const stats = await mecanicasRepositories.getEstadisticasJugador(lang);
      return res.json(stats);
    } catch {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  public static getTiempo: RequestHandler | any = async (
    req: Request,
    res: Response
  ) => {
    const lang = this.getLanguage(req);

    try {
      const tiempo = await mecanicasRepositories.getTiempo(lang);
      return res.json(tiempo);
    } catch {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}

export default MecanicasController;
