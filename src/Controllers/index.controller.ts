import { Request, RequestHandler, Response } from "express";

class indexController {
  public static main: RequestHandler | any = async (req: Request, res: Response) => {
    return res.redirect("/api/");
  };
  public static info: RequestHandler | any = async (req: Request, res: Response) => {
    return res.json({
      routes: ["papersplease", "minecraft", "terminatorsalvation", "theelderscrollsvskyrim"],
    });
  };
}

export default indexController;
