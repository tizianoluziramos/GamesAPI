import fs from "fs/promises";
import path from "path";
import { Item } from "../models/items.model";

class items {
    private dataPath: string = path.join(__dirname, "..", "data", "items.json")
    private cache?: Item[];
    private async readData(): Promise<Item[]> {
        if (this.cache) return this.cache
        const data = await fs.readFile(this.dataPath, "utf-8");
        const result = JSON.parse(data);
        this.cache = result;
        return result;
    }

    public async getAll(): Promise<Item[]> {
        return await this.readData();
    }

    public async searchByName(name: string): Promise<Item[] | undefined> {
        return (await this.readData()).filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
    }

    public async filterByInteractable(interactable: boolean): Promise<Item[]> {
        return (await this.readData()).filter((item) => item.interactable === interactable);
    }

    public async filterByPortable(portable: boolean): Promise<Item[]> {
        return (await this.readData()).filter((item) => item.portable === portable);
    }
}

export default new items();