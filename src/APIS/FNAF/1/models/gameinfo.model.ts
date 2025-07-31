export interface Gameinfo {
  id: number;
  title: string;
  release_year: number;
  developer: string;
  publisher: string;
  genre: string[];
  platforms: string[];
  description: string;
  game_modes: string[];
  difficulty: Difficulty;
  technical: Technical;
  ports: Port[];
  achievements: string[];
}

export interface Difficulty {
  nights: number;
  difficulty_scale: string;
}

export interface Port {
  platform: string;
  release_year: number;
}

export interface Technical {
  engine: string;
  original_resolution: string;
  approx_size: string;
  frame_rate: string;
  file_formats: string[];
}
