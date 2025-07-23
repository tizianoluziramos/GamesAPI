import { Router } from "express";
import indice from "../Controllers/index.controller";

const index = Router();

index.get("/", indice.info);

export default index;
