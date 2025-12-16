export interface Walkthrough {
  complete: string;
  links: { [key: string]: Link };
}

export interface Link {
  url: string;
}
