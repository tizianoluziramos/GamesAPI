import fs from "fs/promises";
import path from "path";
import { iCountry, iCountryData } from "../models/Countries.model";

class PaisesRepository {
  private dataPath = path.join(__dirname, "..", "data", "Paises.json");
  private cache?: iCountry;

  private async readData(): Promise<iCountry> {
    if (this.cache) {
      return this.cache;
    }
    const json = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(json);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<iCountryData[]> {
    const data = await this.readData();
    return data.countries;
  }

  public async getByNombre(nombre: string): Promise<iCountryData | undefined> {
    const data = await this.readData();
    return data.countries.find((pais) => pais.name.toLowerCase() === nombre.toLowerCase());
  }

  public async filterByCiudad(ciudad: string): Promise<iCountryData[]> {
    const data = await this.readData();
    return data.countries.filter((pais) => pais.cities.some((c) => c.toLowerCase().includes(ciudad.toLowerCase())));
  }
}

export default new PaisesRepository();
