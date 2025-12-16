export interface Effects {
  id: number;
  name: string;
  displayName: string;
  type: Type;
}

export enum Type {
  Bad = "bad",
  Good = "good",
}
