import fs from "fs/promises";
import path from "path";
import { mapIcons } from "../models/mapIcons.model";

class mapIconsRepository {
  private dataPath = path.join(__dirname, "..", "data", "mapIcons.json");
  private cache?: mapIcons[];

  private async readData(): Promise<mapIcons[]> {
    if (this.cache) return this.cache;

    const data = await fs.readFile(this.dataPath, "utf-8");
    const result: mapIcons[] = JSON.parse(data);

    this.cache = result;
    return result;
  }
  public async getAll(): Promise<mapIcons[]> {
    return await this.readData();
  }
  public async getById(id: number): Promise<mapIcons | undefined> {
    const data = await this.readData();
    return data.find((map) => map.id === id);
  }
  public async getByName(name: string): Promise<mapIcons | undefined> {
    const data = await this.readData();
    return data.find((map) => map.name === name);
  }
  public async getByAppearance(appearance: string): Promise<mapIcons | undefined> {
    const data = await this.readData();
    return data.find((map) => map.appearance === appearance);
  }
  public async filterByVisibleInItemFrame(visibleInItemFrame: boolean): Promise<mapIcons[] | undefined> {
    const data = await this.readData();
    return data.filter((map) => map.visibleInItemFrame === visibleInItemFrame);
  }
}

export default new mapIconsRepository();
