export interface iCountryData {
  name: string;
  abbreviation: string;
  capital: string;
  cities: string[];
}

export interface iCountry {
  countries: iCountryData[];
}
