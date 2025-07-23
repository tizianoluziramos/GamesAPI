import fs from "fs/promises";
import path from "path";
import { Credits, data } from "../models/Credits.model";

class CreditsRepository {
  private dataPath = path.join(__dirname, "..", "data", "Credits.json");
  private cache?: Credits;

  private async readData(): Promise<Credits> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data) as Credits;
    this.cache = result;
    return result;
  }
  async getAll(): Promise<Credits> {
    const data: Credits = await this.readData();
    return data;
  }
  async getCreator(): Promise<data["creator"]> {
    const data: Credits = await this.readData();
    return data.credits.creator;
  }
  async getCopyright(): Promise<data["copyright"]> {
    const data: Credits = await this.readData();
    return data.credits.copyright;
  }
  async getDevelopment(): Promise<data["development"]> {
    const data: Credits = await this.readData();
    return data.credits.development;
  }
  async getFontsDeliveredFrom(): Promise<data["fontsDerivedFrom"]> {
    const data: Credits = await this.readData();
    return data.credits.fontsDerivedFrom;
  }
  async getLocalizations(): Promise<data["localizations"]> {
    const data: Credits = await this.readData();
    return data.credits.localizations;
  }
  async getSoundEffectContributors(): Promise<data["soundEffectContributors"]> {
    const data: Credits = await this.readData();
    return data.credits.soundEffectContributors;
  }
  async getSoundEffectsSourcedFrom(): Promise<data["soundEffectsSourcedFrom"]> {
    const data: Credits = await this.readData();
    return data.credits.soundEffectsSourcedFrom;
  }
  async getSpecialThanks(): Promise<data["specialThanks"]> {
    const data: Credits = await this.readData();
    return data.credits.specialThanks;
  }
  async getTeams(): Promise<data["teams"]> {
    const data: Credits = await this.readData();
    return data.credits.teams;
  }
  async getTechnologies(): Promise<data["technologies"]> {
    const data: Credits = await this.readData();
    return data.credits.technologies;
  }
}

export default new CreditsRepository();
