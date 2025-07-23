import { Request, Response } from "express";
import recipesRepositories from "../repositories/recipes.repository";

class recipes {
  public async getAll(req: Request, res: Response) {
    const data = await recipesRepositories.getAll();
    res.json(data);
  }

  public async getByResultId(req: Request, res: Response) {
    const { resultId } = req.params;
    const recipes = await recipesRepositories.getByResultId(Number(resultId));

    if (!recipes || recipes.length === 0) {
      res.status(404).json({ message: "No recipes found with that result ID" });
      return;
    }

    res.json(recipes);
  }

  public async getByIngredient(req: Request, res: Response) {
    const { ingredientId } = req.params;
    const recipes = await recipesRepositories.getByIngredient(Number(ingredientId));

    if (!recipes || recipes.length === 0) {
      res.status(404).json({ message: "No recipes found with that ingredient ID" });
      return;
    }

    res.json(recipes);
  }
}

export default new recipes();
