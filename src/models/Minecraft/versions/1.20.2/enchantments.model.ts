export interface Enchantments {
  id: number;
  name: string;
  displayName: string;
  maxLevel: number;
  minCost: Cost;
  maxCost: Cost;
  treasureOnly: boolean;
  curse: boolean;
  exclude: string[];
  category: string;
  weight: number;
  tradeable: boolean;
  discoverable: boolean;
}

export interface Cost {
  a: number;
  b: number;
}
