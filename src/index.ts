import express, { Application } from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import localtunnel from "localtunnel";
import path from "path";

import PapersPleaseAPI from "./APIS/Papers Please/routes";
import MinecraftAPI from "./APIS/Minecraft";
import TerminatorSalvationAPI from "./APIS/Terminator - Salvation/routes/index";
import TheElderScrollsVSkyrim from "./APIS/The Elder Scrolls V Skyrim/";
import PortalAPI from "./APIS/Portal";

import FNAF from "./APIS/FNAF/";
import index from "./routes";
import tools from "./APIS/Tools/";

import "./config/.env.loader";
import { getPublicIP } from "./config/getPublicIp";

// Middlewares
import resetApiUsage from "./middlewares/api_key.middleware";
import { requireApiKey } from "./middlewares/apikey.middleware";

const allowedOrigins = ["http://localhost:3000", "https://gamesapi.loca.lt"];

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
    this.app.use(
      cors({
        origin: function (origin, callback) {
          if (!origin) return callback(null, true); // Permite herramientas tipo Postman
          if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error("Origen no permitido por CORS"), false);
          }
          return callback(null, true);
        },
      })
    );
    this.app.use(express.json());
    this.app.use(compression());
    this.app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://cdnjs.cloudflare.com", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:", "blob:"],
          frameSrc: ["'self'", "https://mapgenie.io"],
          connectSrc: ["'self'", "blob:", "https://gamesapi.loca.lt", "http://localhost:3000"],
          mediaSrc: ["'self'", "blob:"],
        },
      })
    );

    this.app.use("/", express.static(path.join(__dirname, "./frontend")));
    if (process.env.ENVIRONMENT === "Production") {
      this.app.use("/api", requireApiKey);
    }
  }

  private loadRoutes(): void {
    this.app.use("/api", index);
    this.app.use("/api/tools", tools);
    this.app.use("/api/papersplease", PapersPleaseAPI);
    this.app.use("/api/minecraft", MinecraftAPI);
    this.app.use("/api/terminatorsalvation", TerminatorSalvationAPI);
    this.app.use("/api/theelderscrollsvskyrim", TheElderScrollsVSkyrim);
    this.app.use("/api/fnaf", FNAF);
    this.app.use("/api/portal", PortalAPI);

    if (process.env.ENVIRONMENT === "Production") {
      this.app.use("/api/reset-usage", resetApiUsage);
    }
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
