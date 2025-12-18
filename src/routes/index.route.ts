import { Router } from "express";
import PapersPlease from "./PapersPlease.route";
import Minecraft from "./Minecraft.route";
import TerminatorSalvation from "./TerminatorSalvation.route"
import TheElderScrollsVSkyrim from "./TheElderScrollsVSkyrim.route";
import PortalAPI from "./Portal.route";
import Undertale from "./Undertale.route";
import Fnaf from "./Fnaf.route";
import Tools from "./Tools.route";

const index = Router();

index.use("/api/papersplease", PapersPlease);
index.use("/api/minecraft", Minecraft);
index.use("/api/terminatorsalvation", TerminatorSalvation);
index.use("/api/theelderscrollsvskyrim", TheElderScrollsVSkyrim);
index.use("/api/portal", PortalAPI);
index.use("/api/undertale", Undertale);
index.use("/api/fnaf", Fnaf);
index.use("/api/tools", Tools);

export default index;
