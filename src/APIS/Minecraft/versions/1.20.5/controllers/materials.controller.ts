import { Request, Response } from "express";
import materialsRepositories from "../repositories/materials.repository";

class materials {
  public async getAll(req: Request, res: Response) {
    res.json(await materialsRepositories.getAll());
  }

  public async getDefault(req: Request, res: Response) {
    res.json(await materialsRepositories.getDefault());
  }

  public async getLeaves(req: Request, res: Response) {
    res.json(await materialsRepositories.getLeaves());
  }

  public async getCoWeb(req: Request, res: Response) {
    res.json(await materialsRepositories.getCoWeb());
  }

  public async getPlant(req: Request, res: Response) {
    res.json(await materialsRepositories.getPlant());
  }

  public async getGourd(req: Request, res: Response) {
    res.json(await materialsRepositories.getGourd());
  }

  public async getVine_or_glow_lichen(req: Request, res: Response) {
    res.json(await materialsRepositories.getVine_or_glow_lichen());
  }

  public async getWool(req: Request, res: Response) {
    res.json(await materialsRepositories.getWool());
  }

  public async getSword_Instantly_Mines(req: Request, res: Response) {
    res.json(await materialsRepositories.getSword_Instantly_Mines());
  }

  public async getSword_efficient(req: Request, res: Response) {
    res.json(await materialsRepositories.getSword_efficient());
  }

  public async getIncorrect_for_wooden_tool(req: Request, res: Response) {
    res.json(await materialsRepositories.getIncorrect_for_wooden_tool());
  }

  public async getMineableShovel(req: Request, res: Response) {
    res.json(await materialsRepositories.getMineableShovel());
  }

  public async getMineablePickaxe(req: Request, res: Response) {
    res.json(await materialsRepositories.getMineablePickaxe());
  }

  public async getMineableAxe(req: Request, res: Response) {
    res.json(await materialsRepositories.getMineableAxe());
  }

  public async getMineableHoe(req: Request, res: Response) {
    res.json(await materialsRepositories.getMineableHoe());
  }

  public async getIncorrect_for_stone_tool(req: Request, res: Response) {
    res.json(await materialsRepositories.getIncorrect_for_stone_tool());
  }

  public async getIncorrect_for_gold_tool(req: Request, res: Response) {
    res.json(await materialsRepositories.getIncorrect_for_gold_tool());
  }

  public async getIncorrect_for_iron_tool(req: Request, res: Response) {
    res.json(await materialsRepositories.getIncorrect_for_iron_tool());
  }

  public async getIncorrect_for_diamond_tool(req: Request, res: Response) {
    res.json(await materialsRepositories.getIncorrect_for_diamond_tool());
  }

  public async getIncorrect_for_netherite_tool(req: Request, res: Response) {
    res.json(await materialsRepositories.getIncorrect_for_netherite_tool());
  }

  public async getPlantMineableAxe(req: Request, res: Response) {
    res.json(await materialsRepositories.getPlantMineableAxe());
  }

  public async getGourdMineableAxe(req: Request, res: Response) {
    res.json(await materialsRepositories.getGourdMineableAxe());
  }

  public async getLeavesMineableHoe(req: Request, res: Response) {
    res.json(await materialsRepositories.getLeavesMineableHoe());
  }

  public async getLeavesMineableAxeMineableHoe(req: Request, res: Response) {
    res.json(await materialsRepositories.getLeavesMineableAxeMineableHoe());
  }

  public async getVine_or_glow_lichenPlantMineableAxe(req: Request, res: Response) {
    res.json(await materialsRepositories.getVine_or_glow_lichenPlantMineableAxe());
  }
}

export default new materials();
