import { Router } from "express";
import BlockCollisionShapesController from "../../../../controllers/Minecraft/versions/1.20.5/blockColissionShapes.controller";

const blockColissionShapes = Router();

blockColissionShapes.get("/", BlockCollisionShapesController.getAll);
blockColissionShapes.get("/blocks", BlockCollisionShapesController.getBlocks);
blockColissionShapes.get("/shapes", BlockCollisionShapesController.getShapes);

export default blockColissionShapes;
