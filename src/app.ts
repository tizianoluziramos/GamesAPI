import express, { Application } from "express";
import routes from "./routes/index.route";
import errorMiddleware from "./middlewares/error.middleware";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.loadMiddlewares();
    this.loadRoutes();
  }

  private loadMiddlewares(): void {
    this.app.disable("x-powered-by");
    this.app.use(errorMiddleware);
    this.app.use(express.json());
  }

  private loadRoutes(): void {
    this.app.use("/", routes);
  }
}

export default new App().app;
