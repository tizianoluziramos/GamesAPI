import fs from "fs/promises";
import path from "path";
import { Commands } from "../models/commands.model"; // Asegurate de que este path sea correcto

class CommandsRepository {
  private dataPath = path.join(__dirname, "../data/commands.json");
  private cache?: Commands;

  private async readData(): Promise<Commands> {
    if (this.cache) {
      return this.cache;
    }
    const file = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(file) as Commands;
    this.cache = result;
    return result;
  }

  public async getAll() {
    const data = await this.readData();
    return data;
  }

  public async getRoot() {
    const data = await this.readData();
    return data.root;
  }

  public async getParsers() {
    const data = await this.readData();
    return data.parsers;
  }

  public async getParserByName(name: string) {
    const data = await this.readData();
    return data.parsers.find((p) => p.parser === name) || null;
  }

  public async getAllModifiers() {
    const data = await this.readData();
    return data.parsers.map((p) => p.modifier).filter((m): m is NonNullable<typeof m> => m !== null);
  }

  public async getChildrenRecursive() {
    const data = await this.readData();
    const collectChildren = (children: any[]): any[] => {
      return children.flatMap((child: any) => [child, ...collectChildren(child.children || [])]);
    };
    return collectChildren(data.root.children);
  }

  public async findNodeByName(name: string) {
    const data = await this.readData();
    const search = (nodes: any[]): any | null => {
      for (const node of nodes) {
        if (node.name === name) return node;
        const found = search(node.children || []);
        if (found) return found;
      }
      return null;
    };
    return search(data.root.children);
  }
}

export default new CommandsRepository();
