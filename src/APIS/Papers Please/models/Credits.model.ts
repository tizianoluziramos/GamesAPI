export interface Credits {
  credits: data;
}

export interface data {
  creator: string;
  specialThanks: string[];
  development: string;
  technologies: string[];
  localizations: {
    Italian: string[];
    Spanish: string[];
    French: string[];
    German: string[];
    Portuguese_BR: string[];
    Russian: string[];
    Japanese: string[];
  };
  teams: string[];
  fontsDerivedFrom: string[];
  soundEffectsSourcedFrom: string;
  soundEffectContributors: string[];
  copyright: string;
  gloryTo: string;
}
