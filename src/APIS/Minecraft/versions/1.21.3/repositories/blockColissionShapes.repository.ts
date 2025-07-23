import fs from "fs/promises";
import path from "path";
import { BlockCollisionShapes } from "../models/blockColissionShapes.model";

class blockColissionShapes {
  private cache?: BlockCollisionShapes;
  private dataPath = path.join(__dirname, "..", "data", "blockCollisionShapes.json");
  private async readData(): Promise<BlockCollisionShapes> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<BlockCollisionShapes> {
    return await this.readData();
  }
  public async getBlocks(): Promise<BlockCollisionShapes["blocks"]> {
    const data = await this.readData();
    return data.blocks;
  }
  public async getShapes(): Promise<BlockCollisionShapes["shapes"]> {
    const data = await this.readData();
    return data.shapes;
  }
}

export default new blockColissionShapes();
