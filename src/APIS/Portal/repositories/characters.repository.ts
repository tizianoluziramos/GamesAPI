import fs from "fs/promises";
import path from "path";
import { Character } from "../models/characters.model";

class characters {
    private dataPath: string = path.join(__dirname, "..", "data", "characters.json");
    private cache?: Character[];
    private async readData(): Promise<Character[]> {
        if (this.cache) return this.cache;
        const data = await fs.readFile(this.dataPath, "utf-8");
        const result = JSON.parse(data);
        this.cache = result;
        return result;
    }

    public async getAll(): Promise<Character[]> {
        return await this.readData();
    }
}

export default new characters();