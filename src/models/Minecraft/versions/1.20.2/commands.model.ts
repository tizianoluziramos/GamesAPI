export interface Commands {
  root: Root;
  parsers: ParserElement[];
}

export interface ParserElement {
  parser: string;
  modifier: Modifier | null;
  examples: string[];
}

export interface Modifier {
  type?: ModifierType;
  amount?: Amount;
  registry?: string;
  min?: number;
  max?: number;
}

export enum Amount {
  Multiple = "multiple",
  Single = "single",
}

export enum ModifierType {
  Entities = "entities",
  Greedy = "greedy",
  Phrase = "phrase",
  Players = "players",
  Word = "word",
}

export interface Root {
  type: string;
  name: string;
  executable: boolean;
  redirects: any[];
  children: RootChild[];
}

export interface RootChild {
  type: ChildType;
  name: string;
  executable: boolean;
  redirects: any[];
  children: ChildChild[];
}

export interface ChildChild {
  type: ChildType;
  name: string;
  executable: boolean;
  redirects: Redirect[];
  children: ChildChild[];
  parser?: ChildParser;
}

export interface ChildParser {
  parser: string;
  modifier: Modifier | null;
}

export enum Redirect {
  Execute = "execute",
}

export enum ChildType {
  Argument = "argument",
  Literal = "literal",
}
