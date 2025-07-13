import express, { Application } from "express";
import personajesRoutes from "./routes/personajesRoutes";
import cors from "cors";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/api/personajes", personajesRoutes);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

const app = new Server();

app.start();
