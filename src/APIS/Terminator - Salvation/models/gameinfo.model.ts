export interface Gameinfo {
    title:               string;
    developer:           string[];
    publisher:           string[];
    directors:           string[];
    producers:           string[];
    writers:             string[];
    composer:            string[];
    series:              string;
    engine:              string;
    platforms:           string[];
    release_dates:       ReleaseDates;
    genre:               string;
    modes:               string[];
    description:         string;
    plot_summary:        string;
    ios_version_summary: string;
    development:         string;
    reception:           Reception;
}

export interface Reception {
    aggregated_scores: AggregatedScores;
    review_scores:     ReviewScores;
    general_reception: string;
}

export interface AggregatedScores {
    GameRankings: GameRankings;
    Metacritic:   Metacritic;
}

export interface GameRankings {
    iOS: string;
}

export interface Metacritic {
    PC:   string;
    PS3:  string;
    X360: string;
}

export interface ReviewScores {
    "1Up.com":       string;
    Destructoid:     string;
    Edge:            string;
    Eurogamer:       string;
    "Game Informer": string;
    GameSpot:        string;
    GameTrailers:    string;
    GameZone:        string;
    IGN:             Ign;
}

export interface Ign {
    iOS:     string;
    Console: string;
}

export interface ReleaseDates {
    iOS:             string;
    "PlayStation 3": string[];
    "Xbox 360":      string[];
    Windows:         string[];
    "Mobile phone":  string;
}
