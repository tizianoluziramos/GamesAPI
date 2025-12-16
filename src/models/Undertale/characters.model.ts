export interface Characters {
  enemies: Character[];
  maincharacters: Character[];
  npcs: Npcs;
}

export interface Character {
  pageid: number;
  ns: number;
  title: string;
}

export interface Npcs {
  common: Character[];
  shops: Character[];
}
