import { weapons as IWeapons } from "../models/weapons.model";
import fs from "fs/promises";
import path from "path";

class weapons {
  private dataPath = path.join(__dirname, "..", "data", "weapons.json");
  private cache?: IWeapons;
  private async readData(): Promise<IWeapons> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<IWeapons> {
    const data = await this.readData();
    return data;
  }
  public async getHandguns(): Promise<IWeapons["Handguns"]> {
    const data = await this.readData();
    return data.Handguns;
  }
  public async getSubmachineHandGuns(): Promise<IWeapons["Submachine Guns"]> {
    const data = await this.readData();
    return data["Submachine Guns"];
  }
  public async getRifles(): Promise<IWeapons["Rifles"]> {
    const data = await this.readData();
    return data.Rifles;
  }
  public async getShotguns(): Promise<IWeapons["Shotguns"]> {
    const data = await this.readData();
    return data.Shotguns;
  }
  public async getMachineGuns(): Promise<IWeapons["Machine Guns"]> {
    const data = await this.readData();
    return data["Machine Guns"];
  }
  public async getLaunchers(): Promise<IWeapons["Launchers"]> {
    const data = await this.readData();
    return data.Launchers;
  }
}

export default new weapons();
