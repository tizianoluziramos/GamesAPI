import { Router } from "express";
import indexRoute from "./routes/index.route";
import status from "./routes/status.route";

const tools = Router();

tools.use("/", indexRoute);
tools.use("/status", status);

export default tools;
