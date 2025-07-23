import fs from "node:fs/promises";
import path from "path";
import { iPersonaje } from "../models/Character.model";

class PersonajeRepository {
  private dataPath = path.join(__dirname, "..", "data", "Personajes.json");
  private cache?: Record<string, iPersonaje[]>;

  private async readData(): Promise<Record<string, iPersonaje[]>> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result: Record<string, iPersonaje[]> = JSON.parse(data);
    this.cache = result;
    return result;
  }

  private async getByLanguage(lang: string): Promise<iPersonaje[]> {
    const data = await this.readData();
    return data[lang] || [];
  }

  public async getAll(lang: string): Promise<iPersonaje[]> {
    return await this.getByLanguage(lang);
  }

  public async getById(lang: string, id: string) {
    const data = await this.getByLanguage(lang);
    return data.find((p) => p.id === id);
  }

  public async getByName(lang: string, name: string) {
    const data = await this.getByLanguage(lang);
    return data.find((p) => p.name === name);
  }

  public async getByNationality(lang: string, nationality: string) {
    const data = await this.getByLanguage(lang);
    return data.filter((p) => p.nationality === nationality);
  }

  public async getByType(lang: string, type: string) {
    const data = await this.getByLanguage(lang);
    return data.filter((p) => p.type === type);
  }

  public async getByRoles(lang: string, roles: string[]) {
    const data = await this.getByLanguage(lang);
    return data.filter((p) => roles.some((role) => p.roles.map((r) => r.toLowerCase()).includes(role.toLowerCase())));
  }

  public async getRandom(lang: string): Promise<iPersonaje | undefined> {
    const data = await this.getByLanguage(lang);
    if (data.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }

  public async getAvailableLanguages(): Promise<string[]> {
    const raw = await fs.readFile(this.dataPath, "utf-8");
    const data = JSON.parse(raw);

    return Object.keys(data);
  }

  public async getAllLanguagesData(): Promise<Record<string, iPersonaje[]>> {
    const raw = await fs.readFile(this.dataPath, "utf-8");
    return JSON.parse(raw);
  }
}

export default new PersonajeRepository();
