import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

interface ApiKeyEntry {
  key: string;
  allowedRoutes: string[];
  publicUsageLimit?: number;
  currentUsage?: number;
}

const apiKeysFile = path.join(__dirname, "../data/api_keys.json");

function loadApiKeys(): ApiKeyEntry[] {
  try {
    const data = fs.readFileSync(apiKeysFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading apiKeys.json", err);
    return [];
  }
}

function saveApiKeys(apiKeys: ApiKeyEntry[]) {
  try {
    fs.writeFileSync(apiKeysFile, JSON.stringify(apiKeys, null, 2));
  } catch (err) {
    console.error("Error saving apiKeys.json", err);
  }
}

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.query.API_KEY as string;

  if (!apiKey) {
    res.status(401).json({ error: "API_KEY is required" });
    return;
  }

  const apiKeys = loadApiKeys();
  const keyEntry = apiKeys.find((k) => k.key === apiKey);

  if (!keyEntry) {
    res.status(403).json({ error: "Invalid API_KEY" });
    return;
  }

  const reqPath = req.path.endsWith("/") ? req.path : req.path + "/";

  const hasAccess = keyEntry.allowedRoutes.some((route) => {
    if (route.endsWith("/*")) {
      const prefix = route.slice(0, -1);
      return reqPath.startsWith(prefix);
    } else {
      const normalizedRoute = route.endsWith("/") ? route : route + "/";
      return reqPath === normalizedRoute;
    }
  });

  if (!hasAccess) {
    res
      .status(403)
      .json({ error: "API_KEY does not have access to this route" });
    return;
  }

  if (typeof keyEntry.publicUsageLimit === "number") {
    if (typeof keyEntry.currentUsage !== "number") {
      keyEntry.currentUsage = 0;
    }

    if (keyEntry.currentUsage >= keyEntry.publicUsageLimit) {
      res.status(429).json({ error: "Monthly API usage limit exceeded" });
      return;
    }

    keyEntry.currentUsage += 1;
    saveApiKeys(apiKeys);
  }

  next();
}
