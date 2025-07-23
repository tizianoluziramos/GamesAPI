import fs from "fs/promises";
import path from "path";

class protocol {
  private dataPath = path.join(__dirname, "..", "data", "protocol.json");
  private cache: any;
  private async readData(): Promise<any> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<any> {
    return await this.readData();
  }
}

export default new protocol();
