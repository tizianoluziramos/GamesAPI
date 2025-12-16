export interface ILoreSection {
  id: number;
  titulo: string;
  contenido: string;
}

export interface ILoreLanguage {
  titulo: string;
  secciones: ILoreSection[];
}

export interface ILore {
  [lang: string]: ILoreLanguage;
}
