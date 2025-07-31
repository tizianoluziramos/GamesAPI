import fs from "fs/promises";
import path from "path";
import { Walkthrough, Link } from "../models/walkthrough.model";

class walkthrough {
  private cache?: Walkthrough;
  private dataPath: string = path.join(__dirname, "..", "data", "walkthrough.json");
  private async readData(): Promise<Walkthrough> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<Walkthrough> {
    return await this.readData();
  }

  public async getByName(name: string): Promise<Link | undefined> {
    const data = await this.readData();
    return data.links[name];
  }

  public async getByUrl(url: string): Promise<{ name: string; link: Link } | undefined> {
    const data = await this.readData();
    for (const [name, link] of Object.entries(data.links)) {
      if (link.url === url) {
        return { name, link };
      }
    }
    return undefined;
  }
}

export default new walkthrough();
