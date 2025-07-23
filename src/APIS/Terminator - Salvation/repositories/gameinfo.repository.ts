import { Gameinfo } from "../models/gameinfo.model";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(__dirname, "..", "data", "gameinfo.json");
let cache: Gameinfo | undefined;

async function readData(): Promise<Gameinfo> {
  if (cache) {
    return cache;
  }
  const data = await fs.readFile(dataPath, "utf-8");
  const result: Gameinfo = JSON.parse(data);
  cache = result;
  return result;
}

class reception {
  public async getAll(): Promise<Gameinfo["reception"]> {
    const data = await readData();
    return data.reception;
  }
  public AggregatedScores = class {
    public static async getAll(): Promise<Gameinfo["reception"]["aggregated_scores"]> {
      const data = await readData();
      return data.reception.aggregated_scores;
    }
    public static async getGameRankings(): Promise<Gameinfo["reception"]["aggregated_scores"]["GameRankings"]> {
      const data = await readData();
      return data.reception.aggregated_scores.GameRankings;
    }
    public static async getMetacritic(): Promise<Gameinfo["reception"]["aggregated_scores"]["Metacritic"]> {
      const data = await readData();
      return data.reception.aggregated_scores.Metacritic;
    }
  };
  public async getReviewScores(): Promise<Gameinfo["reception"]["review_scores"]> {
    const data = await readData();
    return data.reception.review_scores;
  }
  public async getGeneralReception(): Promise<Gameinfo["reception"]["general_reception"]> {
    const data = await readData();
    return data.reception.general_reception;
  }
}

class gameinfo {
  public reception = new reception();
  public async getAll(): Promise<Gameinfo> {
    const data = await readData();
    return data;
  }
  public async getTitle(): Promise<Gameinfo["title"]> {
    const data = await readData();
    return data.title;
  }
  public async getDeveloper(): Promise<Gameinfo["developer"]> {
    const data = await readData();
    return data.developer;
  }
  public async getPublisher(): Promise<Gameinfo["publisher"]> {
    const data = await readData();
    return data.publisher;
  }
  public async getDirectors(): Promise<Gameinfo["directors"]> {
    const data = await readData();
    return data.directors;
  }
  public async getProducers(): Promise<Gameinfo["producers"]> {
    const data = await readData();
    return data.producers;
  }
  public async getWriters(): Promise<Gameinfo["writers"]> {
    const data = await readData();
    return data.writers;
  }
  public async getComposer(): Promise<Gameinfo["composer"]> {
    const data = await readData();
    return data.composer;
  }
  public async getSeries(): Promise<Gameinfo["series"]> {
    const data = await readData();
    return data.series;
  }
  public async getEngine(): Promise<Gameinfo["engine"]> {
    const data = await readData();
    return data.engine;
  }
  public async getPlatforms(): Promise<Gameinfo["platforms"]> {
    const data = await readData();
    return data.platforms;
  }
  public async getReleaseDates(): Promise<Gameinfo["release_dates"]> {
    const data = await readData();
    return data.release_dates;
  }
  public async getGenre(): Promise<Gameinfo["genre"]> {
    const data = await readData();
    return data.genre;
  }
  public async getModes(): Promise<Gameinfo["modes"]> {
    const data = await readData();
    return data.modes;
  }
  public async getDescription(): Promise<Gameinfo["description"]> {
    const data = await readData();
    return data.description;
  }
  public async getPlotSummary(): Promise<Gameinfo["plot_summary"]> {
    const data = await readData();
    return data.plot_summary;
  }
  public async getIosVersionSummary(): Promise<Gameinfo["ios_version_summary"]> {
    const data = await readData();
    return data.ios_version_summary;
  }
  public async getDevelopment(): Promise<Gameinfo["development"]> {
    const data = await readData();
    return data.development;
  }
}

export default new gameinfo();
