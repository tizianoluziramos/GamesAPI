import express, { Application } from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import path from "path";
import PapersPleaseAPI from "./APIS/Papers Please/routes";
import MinecraftAPI from "./APIS/Minecraft";
import TerminatorSalvationAPI from "./APIS/Terminator - Salvation/routes/index";
import TheElderScrollsVSkyrim from "./APIS/The Elder Scrolls V Skyrim/";
import PortalAPI from "./APIS/Portal";
import UndertaleAPI from "./APIS/Undertale/routes/index.route";
import FNAF from "./APIS/FNAF/";
import index from "./routes";
import tools from "./APIS/Tools/";
import serveIndex from "serve-index";
import "./config/.env.loader";
import { getPublicIP } from "./config/getPublicIp";
import resetApiUsage from "./middlewares/api_key.middleware";
import { requireApiKey } from "./middlewares/apikey.middleware";

const allowedOrigins = ["http://localhost:9090", "http://192.168.1.168:9090"];

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
          if (!origin) return callback(null, true);
          if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error("Origin not allowed by CORS"), false);
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
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          "font-src": ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:", "blob:"],
          frameSrc: ["'self'", "https://mapgenie.io"],
          connectSrc: ["'self'", "blob:", "https://gamesapi.loca.lt", "http://localhost:3000"],
          mediaSrc: ["'self'", "blob:"],
        },
      })
    );

    this.app.use("/", express.static(path.join(__dirname, "./frontend")), serveIndex(path.join(__dirname, "./frontend"), { icons: true }));
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
    this.app.use("/api/undertale", UndertaleAPI);
    if (process.env.ENVIRONMENT === "Production") {
      this.app.use("/api/reset-usage", resetApiUsage);
    }
  }

  public async start(): Promise<void> {
    this.app.listen(Number(this.port), async () => {
      console.log(`🚀 Servidor corriendo en puerto ${this.port}`);

      getPublicIP();
    });
  }
}

const server = new Server();
server.start();
