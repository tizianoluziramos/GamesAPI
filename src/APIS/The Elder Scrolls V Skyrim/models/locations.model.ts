export interface ILocations {
  locations: Location[];
  images: string[];
  externallinks: string[];
}

export interface Location {
  ns: number;
  exists: string;
  name: string;
}
