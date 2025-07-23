import { Request, Response } from "express";
import CommandsRepository from "../repositories/commands.repository";

class CommandsController {
  public async getAll(req: Request, res: Response) {
    try {
      const data = await CommandsRepository.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async getRoot(req: Request, res: Response) {
    try {
      const root = await CommandsRepository.getRoot();
      res.json(root);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving root", details: error });
      return;
    }
  }

  public async getParsers(req: Request, res: Response) {
    try {
      const parsers = await CommandsRepository.getParsers();
      res.json(parsers);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving parsers", details: error });
      return;
    }
  }

  public async getParserByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const parser = await CommandsRepository.getParserByName(name);
      if (!parser) {
        res.status(404).json({ error: "Parser not found" });
        return;
      }
      res.json(parser);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving parser", details: error });
      return;
    }
  }

  public async getAllModifiers(req: Request, res: Response) {
    try {
      const modifiers = await CommandsRepository.getAllModifiers();
      res.json(modifiers);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving modifiers", details: error });
      return;
    }
  }

  public async getChildrenRecursive(req: Request, res: Response) {
    try {
      const children = await CommandsRepository.getChildrenRecursive();
      res.json(children);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving children", details: error });
      return;
    }
  }

  public async findNodeByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const node = await CommandsRepository.findNodeByName(name);
      if (!node) {
        res.status(404).json({ error: "Node not found" });
        return;
      }
      res.json(node);
    } catch (error) {
      res.status(500).json({ error: "Error finding node", details: error });
      return;
    }
  }
}

export default new CommandsController();
