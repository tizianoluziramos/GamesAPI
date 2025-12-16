import express, { Application } from "express";
import compression from "compression";
import routes from "./routes/index.route";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.loadMiddlewares();
    this.loadRoutes();
  }

  private loadMiddlewares(): void {
    this.app.disable("x-powered-by");

    this.app.use(express.json({ limit: "50kb" }));
    this.app.use(compression({ level: 6 }));
  }

  private loadRoutes(): void {
    this.app.use("/", routes);
  }
}

export default new App().app;
