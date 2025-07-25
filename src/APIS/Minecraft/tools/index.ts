import { Router } from "express";
import status from "./routes/status.route";
import index from "./routes/index.route";

const tools = Router();

tools.use("/", index);
tools.use("/status", status);

export default tools;
