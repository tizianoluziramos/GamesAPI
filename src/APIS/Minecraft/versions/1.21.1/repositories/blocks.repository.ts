import fs from "fs/promises";
import path from "path";
import { Blocks } from "../models/blocks.model";

class blocks {
  private cache?: Blocks[];
  private dataPath = path.join(__dirname, "..", "data", "blocks.json");
  private async readData(): Promise<Blocks[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<Blocks[]> {
    return await this.readData();
  }
  public async getById(id: number): Promise<Blocks | undefined> {
    const data = await this.readData();
    return data.find((block) => block.id === id);
  }
  public async getByName(name: string): Promise<Blocks | undefined> {
    const data = await this.readData();
    return data.find((block) => block.name === name);
  }
  public async getByDisplayName(displayName: string): Promise<Blocks | undefined> {
    const data = await this.readData();
    return data.find((block) => block.displayName === displayName);
  }
  public async filterByHardness(hardness: number): Promise<Blocks[] | undefined> {
    const data = await this.readData();
    return data.filter((block) => block.hardness === hardness);
  }
  public async filterByResistance(resistance: number): Promise<Blocks[] | undefined> {
    const data = await this.readData();
    return data.filter((block) => block.resistance === resistance);
  }
  public async filterByStackSize(stacksize: 1 | 16 | 64): Promise<Blocks[] | undefined> {
    const data = await this.readData();
    return data.filter((block) => block.stackSize === stacksize);
  }
  public async filterByDiggable(diggable: boolean): Promise<Blocks[] | undefined> {
    const data = await this.readData();
    return data.filter((block) => block.diggable === diggable);
  }
  public async filterByMaterial(material: string): Promise<Blocks[] | undefined> {
    const data = await this.readData();
    return data.filter((block) => block.material === material);
  }
  public async filterByTransparent(transparent: boolean): Promise<Blocks[] | undefined> {
    const data = await this.readData();
    return data.filter((block) => block.transparent === transparent);
  }
  public async filterByEmitLight(emitlight: number): Promise<Blocks[] | undefined> {
    const data = await this.readData();
    return data.filter((block) => block.emitLight === emitlight);
  }
  public async filterByFilterLight(filterlight: number): Promise<Blocks[] | undefined> {
    const data = await this.readData();
    return data.filter((block) => block.filterLight === filterlight);
  }
  public async filterByDefaultState(defaultstate: number): Promise<Blocks[] | undefined> {
    const data = await this.readData();
    return data.filter((block) => block.defaultState === defaultstate);
  }
  public async filterByMinStateId(minstateid: number): Promise<Blocks[] | undefined> {
    const data = await this.readData();
    return data.filter((block) => block.minStateId === minstateid);
  }
  public async filterByMaxStateId(maxstateid: number): Promise<Blocks[] | undefined> {
    const data = await this.readData();
    return data.filter((block) => block.maxStateId === maxstateid);
  }
  public async filterByBoundingBox(boundingbox: "block" | "empty"): Promise<Blocks[] | undefined> {
    const data = await this.readData();
    return data.filter((block) => block.boundingBox === boundingbox);
  }
}

export default new blocks();
