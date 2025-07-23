export interface Weapons {
  spanish: Spanish[];
  english: English[];
}

export interface Spanish {
  Name: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
}

export interface English {
  Name: string;
  col1: string;
  col2: string;
  col3?: string;
  Upgrade?: string;
  Perk?: Perk;
  "Item ID"?: string;
  ItemID?: string;
  Speed?: string;
  "DPS (Damage per second)"?: string;
  "Upgrade Material"?: string;
  "Additional Effects"?: string;
  Description?: string;
}

export enum Perk {
  Advanced = "Advanced",
  Daedric = "Daedric",
  Dragon = "Dragon",
  Dwarven = "Dwarven",
  Ebony = "Ebony",
  Elven = "Elven",
  Empty = "-",
  Glass = "Glass",
  NA = "N/A",
  None = "None",
  Orcish = "Orcish",
  Perk = "–",
  Steel = "Steel",
}
