import fs from "fs/promises";
import path from "path";
import { RunEntry, SpeedrunLeaderboardResponse } from "../models/Record.model";

class WorldRecordRepository {
  private dataPath = path.join(__dirname, "..", "data", "WorldRecord.json");
  private cache?: Record<string, SpeedrunLeaderboardResponse>;

  private async readData(): Promise<Record<string, SpeedrunLeaderboardResponse>> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  async getAll(lang: string): Promise<SpeedrunLeaderboardResponse> {
    const data = await this.readData();
    return data[lang.toLowerCase()] || [];
  }

  async getAvalibleLanguages(): Promise<Object> {
    const data = await this.readData();
    return Object.keys(data) || [];
  }

  async getByPlace(lang: string, places: string): Promise<RunEntry[]> {
    const data = await this.readData();
    const leaderboard = data[lang.toLowerCase()];

    if (!leaderboard || !leaderboard.data || !leaderboard.data.runs) {
      return [];
    }

    const placeArray = places
      .split("&")
      .map((p) => parseInt(p))
      .filter((p) => !isNaN(p));

    return leaderboard.data.runs.filter((run: any) => placeArray.includes(run.place));
  }

  async getById(lang: string, ids: string): Promise<RunEntry[]> {
    const data = await this.readData();
    const leaderboard = data[lang.toLowerCase()];

    if (!leaderboard || !leaderboard.data || !leaderboard.data.runs) {
      return [];
    }

    const idsArray = ids.split("&");

    return leaderboard.data.runs.filter((r: any) => idsArray.includes(r.run.id));
  }

  async getAllPlaces(lang: string): Promise<RunEntry[] | undefined> {
    const data = await this.readData();
    const leaderboard = data[lang.toLowerCase()];

    if (!leaderboard || !leaderboard.data || !leaderboard.data.runs) {
      return undefined;
    }

    return leaderboard.data.runs;
  }
}

export default new WorldRecordRepository();
