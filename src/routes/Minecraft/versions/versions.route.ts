// versions.route.ts
import { Router } from "express";

import v_1_21_6 from "./1.21.6/index.route";
import v_1_21_5 from "./1.21.5/index.route";
import v_1_21_4 from "./1.21.4/index.route";
import v_1_21_3 from "./1.21.3/index.route";
import v_1_21_1 from "./1.21.1/index.route";
import v_1_20_5 from "./1.20.5/index.route";
import v_1_20_4 from "./1.20.4/index.route";
import v_1_20_3 from "./1.20.3/index.route";
import v_1_20_2 from "./1.20.2/index.route";

const versions = Router();

const versionMap: Record<string, Router> = {
  "1.21.6": v_1_21_6,
  "1.21.5": v_1_21_5,
  "1.21.4": v_1_21_4,
  "1.21.3": v_1_21_3,
  "1.21.1": v_1_21_1,
  "1.20.5": v_1_20_5,
  "1.20.4": v_1_20_4,
  "1.20.3": v_1_20_3,
  "1.20.2": v_1_20_2,
};

Object.entries(versionMap).forEach(([version, router]) => {
  versions.use(`/${version}`, router);
});

export default versions;
