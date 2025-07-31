import fs from "fs/promises";
import path from "path";
import { Books } from "../models/books.model";

class books {
  private cache?: Books[];
  private dataPath: string = path.join(__dirname, "..", "data", "books.json");
  private async readData(): Promise<Books[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<Books[]> {
    const data = await this.readData();
    return data;
  }
  public async getByTitle(title: string): Promise<Books | undefined> {
    const data = await this.readData();
    return data.find((book) => book.title === title);
  }
  public async filterByAuthor(author: string): Promise<Books[] | undefined> {
    const data = await this.readData();
    return data.filter((book) => book.author === author);
  }
}

export default new books();
