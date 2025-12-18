export interface Characters {
  id: number;
  name: string;
  role: string;
  type: string;
  description: string;
  behavior: string;
  appearance: Appearance;
  voice_lines: string[];
  jumpscare: Jumpscare | null;
}

export interface Appearance {
  color: string;
  eyes: string;
  height_cm: number | string;
}

export interface Jumpscare {}
