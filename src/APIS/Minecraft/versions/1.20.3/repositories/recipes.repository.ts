import { Recipes } from "../models/recipes.model";
import fs from "fs/promises";
import path from "path";

class recipes {
  private dataPath = path.join(__dirname, "..", "data", "recipes.json");
  private cache?: Recipes[];

  private async readData(): Promise<Recipes[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<Recipes[]> {
    return await this.readData();
  }

  public async getByResultId(resultId: number): Promise<Recipes[] | undefined> {
    const data = await this.readData();
    return data.filter((recipe) => recipe.result.id === resultId);
  }

  public async getByIngredient(ingredientId: number): Promise<Recipes[] | undefined> {
    const data = await this.readData();

    return data.filter((recipe) => recipe.ingredients?.includes(ingredientId));
  }
}

export default new recipes();
