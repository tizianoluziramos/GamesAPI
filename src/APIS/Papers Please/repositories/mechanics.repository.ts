import fs from "node:fs/promises";
import path from "path";
import { iMecanicas, IDocumento, IEvento, IPenalizacion, IReglas, ITiempo } from "../models/Mechanics.model";

class MecanicasRepository {
  private dataPath = path.join(__dirname, "..", "data", "Mecanicas.json");
  private cache?: Record<string, iMecanicas>;

  private async readData(): Promise<Record<string, iMecanicas>> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getByLanguage(lang: string): Promise<iMecanicas | undefined> {
    const data = await this.readData();
    return data[lang.toLowerCase()];
  }

  public async getAvalibleLenguages(): Promise<any> {
    const data = await this.readData();
    return Object.keys(data);
  }

  public async getAll(): Promise<Record<string, iMecanicas>> {
    return this.readData();
  }

  public async getDocumentos(lang: string): Promise<IDocumento[]> {
    const mecanicas = await this.getByLanguage(lang);
    if (!mecanicas) throw new Error("Idioma no encontrado");
    return mecanicas.mecanicas.documentos;
  }

  public async getDocumentoByTipo(lang: string, tipo: string): Promise<IDocumento | undefined> {
    const documentos = await this.getDocumentos(lang);
    return documentos.find((d) => d.tipo === tipo);
  }

  public async filterDocumentosByCampo(lang: string, campo: string): Promise<IDocumento[]> {
    const documentos = await this.getDocumentos(lang);
    return documentos.filter((doc) => doc.campos.includes(campo));
  }

  public async filterDocumentosByValidacion(lang: string, validacion: string): Promise<IDocumento[]> {
    const documentos = await this.getDocumentos(lang);
    return documentos.filter((doc) => doc.validaciones.some((v) => v.includes(validacion)));
  }

  public async getReglas(lang: string): Promise<IReglas> {
    const mecanicas = await this.getByLanguage(lang);
    if (!mecanicas) throw new Error("Idioma no encontrado");
    return mecanicas.mecanicas.reglas;
  }

  public async getEventos(lang: string): Promise<IEvento[]> {
    const mecanicas = await this.getByLanguage(lang);
    if (!mecanicas) throw new Error("Idioma no encontrado");
    return mecanicas.mecanicas.eventos;
  }

  public async getEventoById(lang: string, id_evento: string): Promise<IEvento | undefined> {
    const eventos = await this.getEventos(lang);
    return eventos.find((ev) => ev.id_evento === id_evento);
  }

  public async filterEventosByNombre(lang: string, nombreParcial: string): Promise<IEvento[]> {
    const eventos = await this.getEventos(lang);
    const nombreLower = nombreParcial.toLowerCase();
    return eventos.filter((ev) => ev.nombre.toLowerCase().includes(nombreLower));
  }

  public async getPenalizaciones(lang: string): Promise<IPenalizacion[]> {
    const mecanicas = await this.getByLanguage(lang);
    if (!mecanicas) throw new Error("Idioma no encontrado");
    return mecanicas.mecanicas.penalizaciones;
  }

  public async filterPenalizacionesByTipo(lang: string, tipo: string): Promise<IPenalizacion[]> {
    const penalizaciones = await this.getPenalizaciones(lang);
    return penalizaciones.filter((p) => p.tipo === tipo);
  }

  public async filterPenalizacionesByRazon(lang: string, razonParcial: string): Promise<IPenalizacion[]> {
    const penalizaciones = await this.getPenalizaciones(lang);
    const razonLower = razonParcial.toLowerCase();
    return penalizaciones.filter((p) => p.razon.toLowerCase().includes(razonLower));
  }

  public async getEstadisticasJugador(lang: string): Promise<string[]> {
    const mecanicas = await this.getByLanguage(lang);
    if (!mecanicas) throw new Error("Idioma no encontrado");
    return mecanicas.mecanicas.estadisticas_jugador;
  }

  public async getTiempo(lang: string): Promise<ITiempo> {
    const mecanicas = await this.getByLanguage(lang);
    if (!mecanicas) throw new Error("Idioma no encontrado");
    return mecanicas.mecanicas.tiempo;
  }
}

export default new MecanicasRepository();
