import fs from "fs/promises";
import path from "path";
import { iTheMovie, FilmDataEnglish, FilmDataSpanish, FilmDataPortuguese } from "../models/TheMovie.model";

class TheMovieRepositories {
  private dataPath = path.join(__dirname, "../data/TheMovie.json");
  private cache?: iTheMovie;

  private async readData(): Promise<iTheMovie> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<iTheMovie> {
    return this.readData();
  }

  public async getByLanguage(language: keyof iTheMovie): Promise<FilmDataEnglish | FilmDataSpanish | FilmDataPortuguese> {
    const data = await this.readData();
    return data[language];
  }

  public async getDuration(language: keyof iTheMovie): Promise<string> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.duracion,
      english: data.english.duration,
      portuguese: data.portuguese.duracao,
    };
    return keyMap[language];
  }

  public async getTitle(language: keyof iTheMovie): Promise<string> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.titulo,
      english: data.english.title,
      portuguese: data.portuguese.titulo,
    };
    return keyMap[language];
  }

  public async getDirectors(language: keyof iTheMovie): Promise<string[]> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.directores,
      english: data.english.directors,
      portuguese: data.portuguese.diretores,
    };
    return keyMap[language];
  }

  public async getOriginalCreator(language: keyof iTheMovie): Promise<string> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.creador_original,
      english: data.english.original_creator,
      portuguese: data.portuguese.criador_original,
    };
    return keyMap[language];
  }

  public async getGenres(language: keyof iTheMovie): Promise<string[]> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.genero,
      english: data.english.genres,
      portuguese: data.portuguese.genero,
    };
    return keyMap[language];
  }

  public async getSynopsis(language: keyof iTheMovie): Promise<string> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.sinopsis,
      english: data.english.synopsis,
      portuguese: data.portuguese.sinopse,
    };
    return keyMap[language];
  }

  public async getCast(language: keyof iTheMovie): Promise<FilmDataEnglish["cast"] | FilmDataSpanish["elenco"] | FilmDataPortuguese["elenco"]> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.elenco,
      english: data.english.cast,
      portuguese: data.portuguese.elenco,
    };
    return keyMap[language];
  }

  public async getLinks(language: keyof iTheMovie): Promise<FilmDataEnglish["links"] | FilmDataSpanish["enlaces"] | FilmDataPortuguese["links"]> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.enlaces,
      english: data.english.links,
      portuguese: data.portuguese.links,
    };
    return keyMap[language];
  }

  public async getThemes(language: keyof iTheMovie): Promise<string[]> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.temas,
      english: data.english.themes,
      portuguese: data.portuguese.temas,
    };
    return keyMap[language];
  }

  public async getImages(language: keyof iTheMovie): Promise<string[]> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.imagenes,
      english: data.english.images,
      portuguese: data.portuguese.imagens,
    };
    return keyMap[language];
  }

  public async getAwards(language: keyof iTheMovie): Promise<string[]> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.premios,
      english: data.english.awards,
      portuguese: data.portuguese.premios,
    };
    return keyMap[language];
  }

  public async getInspiration(language: keyof iTheMovie): Promise<string> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.inspiracion,
      english: data.english.inspiration,
      portuguese: data.portuguese.inspiracao,
    };
    return keyMap[language];
  }

  public async getRelationToGame(language: keyof iTheMovie): Promise<FilmDataEnglish["relation_to_game"] | FilmDataSpanish["relacion_con_el_juego"] | FilmDataPortuguese["relacao_com_o_jogo"]> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.relacion_con_el_juego,
      english: data.english.relation_to_game,
      portuguese: data.portuguese.relacao_com_o_jogo,
    };
    return keyMap[language];
  }

  public async getReception(language: keyof iTheMovie): Promise<FilmDataEnglish["reception"] | FilmDataSpanish["recepcion"] | FilmDataPortuguese["recepcao"]> {
    const data = await this.readData();
    const keyMap = {
      spanish: data.spanish.recepcion,
      english: data.english.reception,
      portuguese: data.portuguese.recepcao,
    };
    return keyMap[language];
  }
}

export default new TheMovieRepositories();
