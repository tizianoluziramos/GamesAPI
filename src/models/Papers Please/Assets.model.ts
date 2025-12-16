export interface IAssets {
  "in-game-fonts": Base64URLString;
  soundeffects: Soundeffect[];
}

export interface Soundeffect {
  name: string;
  id: number;
  url: string;
}
