import fs from "fs/promises";
import path from "path";

class info {
  private basePath = path.join(
    __dirname,
    "..",
    "..",
    "data",
    "Minecraft",
    "info"
  );

  private cache = new Map<string, any>();

  public async getFile(version: string, file: string): Promise<any> {
    const cacheKey = `${version}/${file}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const filePath = path.join(this.basePath, version, `${file}.json`);

    try {
      await fs.access(filePath);
    } catch {
      throw new Error(`${file}.json does not exist for version ${version}`);
    }

    const data = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(data);

    this.cache.set(cacheKey, parsed);
    return parsed;
  }

  // Retorna todas las carpetas (versiones) dentro de basePath
  public async getVersions(): Promise<string[]> {
    const entries = await fs.readdir(this.basePath, { withFileTypes: true });
    return entries.filter(e => e.isDirectory()).map(d => d.name);
  }

  // Retorna todos los archivos JSON dentro de una versión
  public async getFilesOnVersion(version: string): Promise<string[]> {
    const versionPath = path.join(this.basePath, version);
    try {
      const entries = await fs.readdir(versionPath, { withFileTypes: true });
      return entries
        .filter(e => e.isFile() && e.name.endsWith(".json"))
        .map(f => f.name.replace(".json", ""));
    } catch {
      throw new Error(`Version folder "${version}" does not exist`);
    }
  }
}

export default new info();
