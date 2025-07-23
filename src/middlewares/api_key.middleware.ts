import { Router } from "express";
import { ApiKeyManager } from "../Controllers/api_reset.controller";

const router = Router();

router.get("/", ApiKeyManager.showRoutes);

router.get("/generate-reset-link", ApiKeyManager.generateResetLink);

router.get("/api-reset/:token", ApiKeyManager.apiReset);

export default router;
