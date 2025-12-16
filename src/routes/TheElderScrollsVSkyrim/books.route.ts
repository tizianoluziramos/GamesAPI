import { Router } from "express";
import booksController from "../../controllers/TheElderScrollsVSkyrim/books.controller";

const books = Router();

books.get("/", booksController.getAll);
books.get("/title/:title", booksController.getByTitle);
books.get("/author/:author", booksController.filterByAuthor);

export default books;
