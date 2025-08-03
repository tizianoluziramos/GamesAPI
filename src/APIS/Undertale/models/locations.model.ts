export interface Locations {
  general: NewHome[];
  hotland: Hotland;
  "New Home": NewHome[];
  Ruins: NewHome[];
  Snowdin: NewHome[];
  Waterfall: NewHome[];
}

export interface NewHome {
  pageid: number;
  ns: number;
  title: string;
}

export interface Hotland {
  amalgamates: NewHome[];
  locations: NewHome[];
}
