export interface WorldRecordData {
  [lang: string]: SpeedrunLeaderboardResponse;
}

export interface SpeedrunLeaderboardResponse {
  data: LeaderboardData;
}

export interface LeaderboardData {
  weblink: string;
  game: string;
  category: string;
  level: string | null;
  platform: string | null;
  region: string | null;
  emulators: boolean | null;
  "video-only": boolean;
  timing: string;
  values: Record<string, string>;
  runs: RunEntry[];
  links: Link[];
}

export interface RunEntry {
  place: number;
  run: Run;
}

export interface Run {
  id: string;
  weblink: string;
  game: string;
  level: string | null;
  category: string;
  videos: {
    links: {
      uri: string;
    }[];
  } | null;
  comment: string | null;
  status: {
    status: string;
    examiner: string;
    "verify-date": string;
  };
  players: Player[];
  date: string;
  submitted: string;
  times: RunTimes;
  system: RunSystem;
  splits: any; // Puede ser null o más específico
  values: Record<string, string>;
}

export interface Player {
  rel: string;
  id: string;
  uri: string;
}

export interface RunTimes {
  primary: string;
  primary_t: number;
  realtime: string;
  realtime_t: number;
  realtime_noloads: string | null;
  realtime_noloads_t: number;
  ingame: string;
  ingame_t: number;
}

export interface RunSystem {
  platform: string;
  emulated: boolean;
  region: string | null;
}

export interface Link {
  rel: string;
  uri: string;
}
