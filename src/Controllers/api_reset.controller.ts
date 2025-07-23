import { Request, Response } from "express";
import path from "path";
import fs from "fs";

interface ApiKeyEntry {
  key: string;
  allowedRoutes: string[];
  publicUsageLimit?: number;
  currentUsage?: number;
}

export class ApiKeyManager {
  private static apiKeysFile = path.join(__dirname, "../data/api_keys.json");
  private static resetTokens: { [token: string]: string } = {};

  private static loadApiKeys(): ApiKeyEntry[] {
    try {
      const data = fs.readFileSync(ApiKeyManager.apiKeysFile, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error loading apiKeys.json", err);
      return [];
    }
  }

  private static saveApiKeys(apiKeys: ApiKeyEntry[]) {
    try {
      fs.writeFileSync(
        ApiKeyManager.apiKeysFile,
        JSON.stringify(apiKeys, null, 2)
      );
    } catch (err) {
      console.error("Error saving apiKeys.json", err);
    }
  }

  private static createResetToken(apiKey: string): string {
    const token =
      Math.random().toString(36).substring(2) + Date.now().toString(36);
    ApiKeyManager.resetTokens[token] = apiKey;
    setTimeout(() => delete ApiKeyManager.resetTokens[token], 5 * 60 * 1000); // 5 min
    return token;
  }

  private static useResetToken(token: string, apiKey: string): boolean {
    if (ApiKeyManager.resetTokens[token] === apiKey) {
      delete ApiKeyManager.resetTokens[token];
      return true;
    }
    return false;
  }

  private static resetCurrentUsageForKey(apiKey: string) {
    const apiKeys = ApiKeyManager.loadApiKeys();
    const key = apiKeys.find((k) => k.key === apiKey);
    if (key) {
      key.currentUsage = 0;
      ApiKeyManager.saveApiKeys(apiKeys);
    }
  }

  // --- Métodos públicos (controllers) ---
  static generateResetLink(req: Request, res: Response) {
    const apiKey = req.query.API_KEY as string;
    const apiKeys = ApiKeyManager.loadApiKeys();

    if (!apiKey || !apiKeys.some((k) => k.key === apiKey)) {
      res.status(403).json({ error: "Invalid API_KEY" });
      return;
    }

    const token = ApiKeyManager.createResetToken(apiKey);
    const resetLink = `http://localhost:3000/public/reset-usage/api-reset/${token}?API_KEY=${apiKey}`;
    res.json({ resetLink });
  }

  static showRoutes(req: Request, res: Response) {
    res.json({ routes: ["generate-reset-link", "api-reset"] });
    return;
  }

  static apiReset(req: Request, res: Response) {
    const token = req.params.token;
    const apiKey = req.query.API_KEY as string;

    if (!ApiKeyManager.useResetToken(token, apiKey)) {
      res.status(403).json({ error: "Invalid or expired reset token" });
      return;
    }

    ApiKeyManager.resetCurrentUsageForKey(apiKey);
    res.json({ message: "✅ currentUsage reseteado con éxito." });
  }
}
