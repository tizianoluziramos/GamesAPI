import { Request, Response } from "express";

export default (req: Request, res: Response) => {
  res.json([
    "characters",
    "assets",
    "credits",
    "endings",
    "lore",
    "mechanics",
    "online-stats",
    "countries",
    "worldrecord",
    "movie",
    "shops",
  ]);
};
