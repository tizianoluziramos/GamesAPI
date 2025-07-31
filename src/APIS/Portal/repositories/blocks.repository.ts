import fs from "fs/promises";
import path from "path";
import { Block } from "../models/blocks.model";

class blocks {
    private dataPath: string = path.join(__dirname, "..", "data", "blocks.json")
    private cache?: Block[];
    private async readData(): Promise<Block[]> {
        if (this.cache) return this.cache
        const data = await fs.readFile(this.dataPath, "utf-8");
        const result = JSON.parse(data);
        this.cache = result;
        return result;
    }

    public async getAll(): Promise<Block[]> {
        return await this.readData();
    }

    public async searchByName(name: string): Promise<Block[] | undefined> {
        const data = (await this.readData()).filter((block) => block.name.toLowerCase().includes(name.toLowerCase())) 
        return data;
    }

    public async filterByInteractable(interactable: boolean): Promise<Block[] | undefined> {
        const data = (await this.readData()).filter((block) => block.interactable === interactable); 
        return data;
    }
    public async filterByPortalSurface(portalsurface: boolean): Promise<Block[] | undefined> {
        const data = (await this.readData()).filter((block) => block.portalSurface === portalsurface); 
        return data;
    }
}

export default new blocks();