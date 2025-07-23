import fs from "fs/promises";
import path from "path";
import { iFinal } from "../models/Endings.model";

class FinalesRepository {
  private dataPath = path.join(__dirname, "..", "data", "Finales.json");
  private cache?: Record<string, iFinal[]>;

  private async readData(): Promise<Record<string, iFinal[]>> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result: Record<string, iFinal[]> = JSON.parse(data);
    this.cache = result;
    return result;
  }

  async getAvailableLanguages(): Promise<string[]> {
    const data = await this.readData();
    return Object.keys(data);
  }

  async getAll(lang: string): Promise<iFinal[]> {
    const data = await this.readData();
    return data[lang.toLowerCase()] || [];
  }

  async getById(lang: string, id: string): Promise<iFinal | undefined> {
    const finales = await this.getAll(lang);
    return finales.find((final) => final.id === id);
  }

  async getByTitulo(lang: string, titulo: string): Promise<iFinal | undefined> {
    const finales = await this.getAll(lang);
    return finales.find((final) => final.titulo.toLowerCase() === titulo.toLowerCase());
  }

  async filterByConsecuencias(lang: string, texto: string): Promise<iFinal[]> {
    const finales = await this.getAll(lang);
    return finales.filter((final) => final.consecuencias.some((c) => c.toLowerCase().includes(texto.toLowerCase())));
  }

  async filterByCondiciones(lang: string, texto: string): Promise<iFinal[]> {
    const finales = await this.getAll(lang);
    return finales.filter((final) => final.condiciones.some((c) => c.toLowerCase().includes(texto.toLowerCase())));
  }

  async filterByTipo(lang: string, tipo: string): Promise<iFinal[]> {
    const finales = await this.getAll(lang);
    return finales.filter((final) => final.tipo === tipo);
  }

  async filterByDia(lang: string, dia: number): Promise<iFinal[]> {
    const finales = await this.getAll(lang);
    return finales.filter((final) => final.dia === dia);
  }

  async filterByEzic(lang: string, ezic: boolean): Promise<iFinal[]> {
    const finales = await this.getAll(lang);
    return finales.filter((final) => final.ezic === ezic);
  }
}

export default new FinalesRepository();
