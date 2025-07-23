// src/controllers/tiendaController.ts

import { RequestHandler } from "express";
import tiendaRepositories from "../repositories/shops.repository";
import cdKeysRepositories from "../repositories/keys.repository";

class tiendaController {
  public static async getData() {
    try {
      const data = await cdKeysRepositories.getSellersWithBrowser("https://www.cdkeysforgames.com/games/steam-games/papers-please/");
      return data;
    } catch {}
  }

  public static getAll: RequestHandler = async (req, res) => {
    const data: any = await tiendaRepositories.getAll();
    const data2: any = { extras: "/keys" };
    const result = { ...data, ...data2 };
    res.json(result);
  };

  public static getBestSellers: RequestHandler = async (req, res) => {
    res.json(await tiendaController.getData());
  };

  public static getById: RequestHandler = async (req, res) => {
    const id: number = Number(req.params.id);
    res.json(await tiendaRepositories.getById(id));
  };

  public static getByName: RequestHandler = async (req, res) => {
    const name: string = req.params.name;
    res.json(await tiendaRepositories.getByName(name));
  };
}

export default tiendaController;
