import { Request, Response, RequestHandler } from "express";
import TheMovieRepositories from "../repositories/TheMovie.repository";

class TheMovieController {
  public getAll: RequestHandler = async (req: Request, res: Response) => {
    const data = await TheMovieRepositories.getAll();
    res.json(data);
  };

  public getByLanguage: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const { lang } = req.params;
    const data = await TheMovieRepositories.getByLanguage(lang as any);
    if (!data) res.status(404).json({ error: "Language not found" });
    res.json(data);
  };

  public getDuration: RequestHandler = async (req: Request, res: Response) => {
    const { lang } = req.params;
    res.json({ duration: await TheMovieRepositories.getDuration(lang as any) });
  };

  public getTitle: RequestHandler = async (req: Request, res: Response) => {
    const { lang } = req.params;
    res.json({ title: await TheMovieRepositories.getTitle(lang as any) });
  };

  public getDirectors: RequestHandler = async (req: Request, res: Response) => {
    const { lang } = req.params;
    res.json({
      directors: await TheMovieRepositories.getDirectors(lang as any),
    });
  };

  public getOriginalCreator: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const { lang } = req.params;
    res.json({
      original_creator: await TheMovieRepositories.getOriginalCreator(
        lang as any
      ),
    });
  };

  public getGenres: RequestHandler = async (req: Request, res: Response) => {
    const { lang } = req.params;
    res.json({ genres: await TheMovieRepositories.getGenres(lang as any) });
  };

  public getSynopsis: RequestHandler = async (req: Request, res: Response) => {
    const { lang } = req.params;
    res.json({ synopsis: await TheMovieRepositories.getSynopsis(lang as any) });
  };

  public getCast: RequestHandler = async (req: Request, res: Response) => {
    const { lang } = req.params;
    res.json({ cast: await TheMovieRepositories.getCast(lang as any) });
  };

  public getLinks: RequestHandler = async (req: Request, res: Response) => {
    const { lang } = req.params;
    res.json({ links: await TheMovieRepositories.getLinks(lang as any) });
  };

  public getThemes: RequestHandler = async (req: Request, res: Response) => {
    const { lang } = req.params;
    res.json({ themes: await TheMovieRepositories.getThemes(lang as any) });
  };

  public getImages: RequestHandler = async (req: Request, res: Response) => {
    const { lang } = req.params;
    res.json({ images: await TheMovieRepositories.getImages(lang as any) });
  };

  public getAwards: RequestHandler = async (req: Request, res: Response) => {
    const { lang } = req.params;
    res.json({ awards: await TheMovieRepositories.getAwards(lang as any) });
  };

  public getInspiration: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const { lang } = req.params;
    res.json({
      inspiration: await TheMovieRepositories.getInspiration(lang as any),
    });
  };

  public getRelationToGame: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const { lang } = req.params;
    res.json({
      relation_to_game: await TheMovieRepositories.getRelationToGame(
        lang as any
      ),
    });
  };

  public getReception: RequestHandler = async (req: Request, res: Response) => {
    const { lang } = req.params;
    res.json({
      reception: await TheMovieRepositories.getReception(lang as any),
    });
  };
}

export default new TheMovieController();
