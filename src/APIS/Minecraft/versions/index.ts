import { Router } from "express";
import v_1_21_6 from "./1.21.6";
import v_1_21_5 from "./1.21.5";
import v_1_21_4 from "./1.21.4";
import v_1_21_3 from "./1.21.3";
import v_1_21_1 from "./1.21.1";
import v_1_20_5 from "./1.20.5";
import v_1_20_4 from "./1.20.4";
import v_1_20_3 from "./1.20.3";
import v_1_20_2 from "./1.20.2";

import indexController from "../controllers/versions.controller";

const versions = Router();

versions.get("/", indexController.getVersions);
versions.use("/1.21.6", v_1_21_6);
versions.use("/1.21.5", v_1_21_5);
versions.use("/1.21.4", v_1_21_4);
versions.use("/1.21.3", v_1_21_3);
versions.use("/1.21.1", v_1_21_1);
versions.use("/1.20.5", v_1_20_5);
versions.use("/1.20.4", v_1_20_4);
versions.use("/1.20.3", v_1_20_3);
versions.use("/1.20.2", v_1_20_2);

export default versions;
