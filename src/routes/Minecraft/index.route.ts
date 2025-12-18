import { Router } from "express";

import versions from "./versions/versions.route";
import tools from "./tools.route";

const Minecraft = Router();

Minecraft.use("/versions", versions);
Minecraft.use("/tools", tools);

export default Minecraft;
