import cluster from "cluster";
import os from "os";
import express, { Application } from "express";
import PapersPleaseAPI from "./APIS/Papers Please/routes";
import MinecraftAPI from "./APIS/Minecraft";
import TerminatorSalvationAPI from "./APIS/Terminator - Salvation/routes/index";
import TheElderScrollsVSkyrim from "./APIS/The Elder Scrolls V Skyrim/";
import "./config/.env.loader";
import index from "./routes";

// 🛡️ Middlewares
import resetApiUsage from "./middlewares/api_key.middleware";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
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
    this.app.set("trust proxy", true);
    this.app.use((req: any, res: any, next) => {
      if (req.subdomains.includes("api")) {
        return next();
      }
      return res.status(403).json({ error: "Access only by API.*" });
    });
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

  public start(): void {
    if (cluster.worker && cluster.worker?.id === 1) {
      this.app.listen(this.port, () => {
        console.log(`🚀 Servidor corriendo en puerto ${this.port}`);
      });
    }
  }
}

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`🧠 Modo cluster activado: ${numCPUs} núcleos`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.warn(`❌ Worker ${worker.process.pid} murió. Reiniciando...`);
    cluster.fork();
  });
} else {
  const server = new Server();
  server.start();
}
