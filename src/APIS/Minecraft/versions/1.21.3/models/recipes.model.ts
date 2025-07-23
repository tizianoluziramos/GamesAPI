export interface Recipes {
  inShape?: Array<Array<number | null>>;
  result: Result;
  ingredients?: number[];
}

export interface Result {
  id: number;
  count: number;
}
