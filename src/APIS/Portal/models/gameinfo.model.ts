export interface Gameinfo {
  title: string;
  developer: string;
  publisher: string;
  release_date: ReleaseDate;
  platforms: string[];
  modes: string[];
  genre: string[];
  description: string;
  engine: string;
  series: string;
  languages: string[];
}

interface ReleaseDate {
  worldwide: Date;
  regions: Regions;
}

interface Regions {
  NA: Date;
  EU: Date;
  JP: Date;
}
