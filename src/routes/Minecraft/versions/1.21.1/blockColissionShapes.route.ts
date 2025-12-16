import { Router } from "express";
import BlockCollisionShapesController from "../../../../controllers/Minecraft/versions/1.21.1/blockColissionShapes.controller";

const blockColissionShapes = Router();

blockColissionShapes.get("/", BlockCollisionShapesController.getAll);
blockColissionShapes.get("/blocks", BlockCollisionShapesController.getBlocks);
blockColissionShapes.get("/shapes", BlockCollisionShapesController.getShapes);

export default blockColissionShapes;
