import { Request, Response } from "express";
import particlesRepositories from "../repositories/particles.repository";

class particles {
  public async getAll(req: Request, res: Response) {
    res.json(await particlesRepositories.getAll());
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const particle = await particlesRepositories.getById(Number(id));
    if (!particle) {
      res.status(404).json({ message: "Particle not found" });
      return;
    }
    res.json(particle);
  }

  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    const particle = await particlesRepositories.getByName(name);
    if (!particle) {
      res.status(404).json({ message: "Particle not found" });
      return;
    }
    res.json(particle);
  }
}

export default new particles();
