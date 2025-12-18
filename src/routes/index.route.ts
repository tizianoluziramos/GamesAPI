import { Router } from "express";
import tools from "./Minecraft/tools.route";
import PapersPlease from "./Papers Please/index.route";
import MinecraftAPI from "./Minecraft/index.route";
import TerminatorSalvation from "./TerminatorSalvation/index.route"
import TheElderScrollsVSkyrim from "./TheElderScrollsVSkyrim/index.route";
import PortalAPI from "./Portal/index.route";
import UndertaleAPI from "./Undertale/index.route";
import fnaf1 from "./Fnaf/index.route";

const index = Router();

index.use("/api/tools", tools);
index.use("/api/papersplease", PapersPlease);
index.use("/api/minecraft", MinecraftAPI);
index.use("/api/terminatorsalvation", TerminatorSalvation);
index.use("/api/theelderscrollsvskyrim", TheElderScrollsVSkyrim);
index.use("/api/portal", PortalAPI);
index.use("/api/undertale", UndertaleAPI);
index.use("/api/fnaf", fnaf1);

export default index;
