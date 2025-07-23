import express from "express";
import materialsController from "../controllers/materials.controller";

const materials = express.Router();

materials.get("/", (req, res) => materialsController.getAll(req, res));
materials.get("/default", (req, res) => materialsController.getDefault(req, res));
materials.get("/leaves", (req, res) => materialsController.getLeaves(req, res));
materials.get("/coWeb", (req, res) => materialsController.getCoWeb(req, res));
materials.get("/plant", (req, res) => materialsController.getPlant(req, res));
materials.get("/gourd", (req, res) => materialsController.getGourd(req, res));
materials.get("/vine_or_glow_lichen", (req, res) => materialsController.getVine_or_glow_lichen(req, res));
materials.get("/wool", (req, res) => materialsController.getWool(req, res));
materials.get("/sword_Instantly_Mines", (req, res) => materialsController.getSword_Instantly_Mines(req, res));
materials.get("/sword_efficient", (req, res) => materialsController.getSword_efficient(req, res));
materials.get("/incorrect_for_wooden_tool", (req, res) => materialsController.getIncorrect_for_wooden_tool(req, res));
materials.get("/mineableShovel", (req, res) => materialsController.getMineableShovel(req, res));
materials.get("/mineablePickaxe", (req, res) => materialsController.getMineablePickaxe(req, res));
materials.get("/mineableAxe", (req, res) => materialsController.getMineableAxe(req, res));
materials.get("/mineableHoe", (req, res) => materialsController.getMineableHoe(req, res));
materials.get("/incorrect_for_stone_tool", (req, res) => materialsController.getIncorrect_for_stone_tool(req, res));
materials.get("/incorrect_for_gold_tool", (req, res) => materialsController.getIncorrect_for_gold_tool(req, res));
materials.get("/incorrect_for_iron_tool", (req, res) => materialsController.getIncorrect_for_iron_tool(req, res));
materials.get("/incorrect_for_diamond_tool", (req, res) => materialsController.getIncorrect_for_diamond_tool(req, res));
materials.get("/incorrect_for_netherite_tool", (req, res) => materialsController.getIncorrect_for_netherite_tool(req, res));
materials.get("/plantMineableAxe", (req, res) => materialsController.getPlantMineableAxe(req, res));
materials.get("/gourdMineableAxe", (req, res) => materialsController.getGourdMineableAxe(req, res));
materials.get("/leavesMineableHoe", (req, res) => materialsController.getLeavesMineableHoe(req, res));
materials.get("/leavesMineableAxeMineableHoe", (req, res) => materialsController.getLeavesMineableAxeMineableHoe(req, res));
materials.get("/vine_or_glow_lichenPlantMineableAxe", (req, res) => materialsController.getVine_or_glow_lichenPlantMineableAxe(req, res));

export default materials;
