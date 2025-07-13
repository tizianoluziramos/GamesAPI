import fs from "node:fs/promises";
import path from "path";
import { iPersonaje } from "../models/Personaje";

const dataPath = path.join(__dirname, "..", "data", "Personajes.json");

class personajeRepository {
  private async readData(): Promise<iPersonaje[]> {
    const data = await fs.readFile(dataPath, "utf-8");
    return await JSON.parse(data);
  }
  public async getAll(): Promise<iPersonaje[]> {
    return await this.readData();
  }
  public async getById(id: string) {
    const data = await this.readData();
    return data.find((p) => p.id === id);
  }
  public async getByName(name: string) {
    const data = await this.readData();
    return data.find((p) => p.name === name);
  }
  public async getByNationality(nationality: string) {
    const data = await this.readData();
    return data.filter((p) => p.nationality === nationality);
  }
  public async getByType(type: string) {
    const data = await this.readData();
    return data.filter((p) => p.type === type);
  }
  public async getByRoles(roles: string[]) {
    const data = await this.readData();
    return data.filter((p) => p.roles === roles);
  }
}

export default new personajeRepository();
