import fs from "fs/promises";
import path from "path";
import { ITienda, ITiendas } from "../models/Shop.model";

class TiendaRepositories {
  private dataPath = path.join(__dirname, "..", "data", "Tiendas.json");
  private cache?: ITiendas;

  private async readData(): Promise<ITiendas> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data) as ITiendas;
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<ITiendas> {
    return await this.readData();
  }

  public async getById(id: number): Promise<ITienda | { error: string }> {
    const tienda: ITiendas = await this.readData();
    const result = tienda.find((t: ITienda) => t.id === id);
    if (result !== undefined) {
      return result;
    }
    return {
      error: "Not Found",
    };
  }

  public async getByName(name: string): Promise<ITienda | { error: string }> {
    const tienda: ITiendas = await this.readData();
    const result = tienda.find((t: ITienda) => t.name === name);
    if (result !== undefined) {
      return result;
    }
    return {
      error: "Not Found",
    };
  }
}

export default new TiendaRepositories();
