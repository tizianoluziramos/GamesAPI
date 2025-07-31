import { Request, Response } from "express";
import booksRepository from "../repositories/books.repository";

class books {
  public async getAll(req: Request, res: Response) {
    res.json(await booksRepository.getAll());
  }
  public async getByTitle(req: Request, res: Response) {
    const { title } = req.params;
    res.json(await booksRepository.getByTitle(title));
  }
  public async filterByAuthor(req: Request, res: Response) {
    const { author } = req.params;
    res.json(await booksRepository.filterByAuthor(author));
  }
}

export default new books();
