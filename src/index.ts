import express, { Application } from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import localtunnel from "localtunnel";

import PapersPleaseAPI from "./APIS/Papers Please/routes";
import MinecraftAPI from "./APIS/Minecraft";
import TerminatorSalvationAPI from "./APIS/Terminator - Salvation/routes/index";
import TheElderScrollsVSkyrim from "./APIS/The Elder Scrolls V Skyrim/";
import index from "./routes";

import "./config/.env.loader";
import { getPublicIP } from "./config/getPublicIp";

// Middlewares
import resetApiUsage from "./middlewares/api_key.middleware";
import { requireApiKey } from "./middlewares/apikey.middleware";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    this.loadMiddlewares();
    this.loadRoutes();
  }

  private loadMiddlewares(): void {
    this.app.use(cors({ origin: "http://localhost:3000" }));
    this.app.use(express.json());
    this.app.use(compression());
    this.app.use(helmet());

    if (process.env.ENVIRONMENT === "Production") {
      this.app.use(requireApiKey);
    }
  }

  private loadRoutes(): void {
    this.app.use("/papersplease", PapersPleaseAPI);
    this.app.use("/minecraft", MinecraftAPI);
    this.app.use("/terminatorsalvation", TerminatorSalvationAPI);
    this.app.use("/theelderscrollsvskyrim", TheElderScrollsVSkyrim);

    if (process.env.ENVIRONMENT === "Production") {
      this.app.use("/reset-usage", resetApiUsage);
    }

    this.app.use("/", index);
  }

  public async start(): Promise<void> {
    this.app.listen(Number(this.port), async () => {
      console.log(`🚀 Servidor corriendo en puerto ${this.port}`);

      getPublicIP();

      const tunnel = await localtunnel({
        port: Number(this.port),
        subdomain: "gamesapi",
      });

      console.log(`🌐 Tu API está disponible públicamente en: ${tunnel.url}`);

      tunnel.on("close", () => {
        console.log("❌ Túnel cerrado");
      });
    });
  }
}

const server = new Server();
server.start();
