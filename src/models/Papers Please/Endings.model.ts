export interface iFinal {
  id: string;
  titulo: string;
  descripcion: string;
  condiciones: string[];
  consecuencias: string[];
  tipo: "bueno" | "malo" | "neutral";
  dia?: number;
  ezic?: boolean;
}
