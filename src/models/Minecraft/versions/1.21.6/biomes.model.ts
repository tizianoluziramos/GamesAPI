export interface Biomes {
  id: number;
  name: string;
  category: string;
  temperature: number;
  has_precipitation: boolean;
  dimension: Dimension;
  displayName: string;
  color: number;
}

export enum Dimension {
  End = "end",
  Nether = "nether",
  Overworld = "overworld",
}
