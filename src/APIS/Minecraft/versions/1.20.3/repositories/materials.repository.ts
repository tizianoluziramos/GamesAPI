import fs from "fs/promises";
import path from "path";
import { Materials } from "../models/materials.model";

class materials {
  private dataPath = path.join(__dirname, "..", "data", "materials.json");
  private cache?: Materials;
  private async readData(): Promise<Materials> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<Materials> {
    return await this.readData();
  }
  public async getDefault(): Promise<Materials["default"]> {
    const data: Materials = await this.readData();
    return data.default;
  }
  public async getLeaves(): Promise<Materials["leaves"]> {
    const data: Materials = await this.readData();
    return data.leaves;
  }
  public async getCoWeb(): Promise<Materials["coweb"]> {
    const data: Materials = await this.readData();
    return data.coweb;
  }
  public async getPlant(): Promise<Materials["plant"]> {
    const data: Materials = await this.readData();
    return data.plant;
  }
  public async getGourd(): Promise<Materials["gourd"]> {
    const data: Materials = await this.readData();
    return data.gourd;
  }
  public async getVine_or_glow_lichen(): Promise<Materials["vine_or_glow_lichen"]> {
    const data: Materials = await this.readData();
    return data.vine_or_glow_lichen;
  }
  public async getWool(): Promise<Materials["wool"]> {
    const data: Materials = await this.readData();
    return data.wool;
  }
  public async getSword_Instantly_Mines(): Promise<Materials["sword_instantly_mines"]> {
    const data: Materials = await this.readData();
    return data.sword_instantly_mines;
  }
  public async getSword_efficient(): Promise<Materials["sword_efficient"]> {
    const data: Materials = await this.readData();
    return data.sword_efficient;
  }
  public async getIncorrect_for_wooden_tool(): Promise<Materials["incorrect_for_wooden_tool"]> {
    const data: Materials = await this.readData();
    return data.incorrect_for_wooden_tool;
  }
  public async getMineableShovel(): Promise<Materials["mineable/shovel"]> {
    const data: Materials = await this.readData();
    return data["mineable/shovel"];
  }
  public async getMineablePickaxe(): Promise<Materials["mineable/pickaxe"]> {
    const data: Materials = await this.readData();
    return data["mineable/pickaxe"];
  }
  public async getMineableAxe(): Promise<Materials["mineable/axe"]> {
    const data: Materials = await this.readData();
    return data["mineable/axe"];
  }
  public async getMineableHoe(): Promise<Materials["mineable/hoe"]> {
    const data: Materials = await this.readData();
    return data["mineable/axe"];
  }
  public async getIncorrect_for_stone_tool(): Promise<Materials["incorrect_for_stone_tool"]> {
    const data: Materials = await this.readData();
    return data["incorrect_for_stone_tool"];
  }
  public async getIncorrect_for_gold_tool(): Promise<Materials["incorrect_for_gold_tool"]> {
    const data: Materials = await this.readData();
    return data["incorrect_for_gold_tool"];
  }
  public async getIncorrect_for_iron_tool(): Promise<Materials["incorrect_for_iron_tool"]> {
    const data: Materials = await this.readData();
    return data["incorrect_for_iron_tool"];
  }
  public async getIncorrect_for_diamond_tool(): Promise<Materials["incorrect_for_diamond_tool"]> {
    const data: Materials = await this.readData();
    return data["incorrect_for_diamond_tool"];
  }
  public async getIncorrect_for_netherite_tool(): Promise<Materials["incorrect_for_netherite_tool"]> {
    const data: Materials = await this.readData();
    return data["incorrect_for_netherite_tool"];
  }
  public async getPlantMineableAxe(): Promise<Materials["plant;mineable/axe"]> {
    const data: Materials = await this.readData();
    return data["plant;mineable/axe"];
  }
  public async getGourdMineableAxe(): Promise<Materials["gourd;mineable/axe"]> {
    const data: Materials = await this.readData();
    return data["gourd;mineable/axe"];
  }
  public async getLeavesMineableHoe(): Promise<Materials["leaves;mineable/hoe"]> {
    const data: Materials = await this.readData();
    return data["leaves;mineable/hoe"];
  }
  public async getLeavesMineableAxeMineableHoe(): Promise<Materials["leaves;mineable/axe;mineable/hoe"]> {
    const data: Materials = await this.readData();
    return data["leaves;mineable/axe;mineable/hoe"];
  }
  public async getVine_or_glow_lichenPlantMineableAxe(): Promise<Materials["vine_or_glow_lichen;plant;mineable/axe"]> {
    const data: Materials = await this.readData();
    return data["vine_or_glow_lichen;plant;mineable/axe"];
  }
}

export default new materials();
