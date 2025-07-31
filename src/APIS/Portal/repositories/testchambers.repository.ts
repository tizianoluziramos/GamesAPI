import fs from "fs/promises"
import path from "path";
import { Testchambers } from "../models/testchambers.model";

class testchambers {
    private cache?: Testchambers;
    private dataPath: string = path.join(__dirname, "..", "data", "testchambers.json");
    private async readData(): Promise<Testchambers> {
        if (this.cache) return this.cache;
        const data = await fs.readFile(this.dataPath, "utf-8");
        const result = JSON.parse(data);
        this.cache = result;
        return result;
    }
    public async getAll(): Promise<Testchambers> {
        return await this.readData();
    }

    public async getMain(): Promise<Testchambers["main"]> {
        return (await this.readData()).main;
    }

    public async getChallenge(): Promise<Testchambers["challenge"]> {
        return (await this.readData()).challenge;
    }
    public async getAdvanced(): Promise<Testchambers["advanced"]> {
        return (await this.readData()).advanced;
    }
    public async getStillAliveBonus(): Promise<Testchambers["stillAliveBonus"]> {
        return (await this.readData()).stillAliveBonus;
    }
}

export default new testchambers();