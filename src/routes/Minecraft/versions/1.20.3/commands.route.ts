import { Router } from "express";
import CommandsController from "../../../../controllers/Minecraft/versions/1.20.3/commands.controller";

const commands = Router();

commands.get("/", CommandsController.getAll);

commands.get("/root", CommandsController.getRoot);

commands.get("/parsers", CommandsController.getParsers);

commands.get("/parsers/:name", CommandsController.getParserByName);

commands.get("/modifiers", CommandsController.getAllModifiers);

commands.get("/children", CommandsController.getChildrenRecursive);

commands.get("/node/:name", CommandsController.findNodeByName);

export default commands;
