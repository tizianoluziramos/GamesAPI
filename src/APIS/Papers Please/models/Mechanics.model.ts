export interface iMecanicas {
  mecanicas: IData;
}

export interface IData {
  documentos: IDocumento[];
  reglas: IReglas;
  eventos: IEvento[];
  penalizaciones: IPenalizacion[];
  estadisticas_jugador: string[];
  tiempo: ITiempo;
}

export interface IDocumento {
  tipo: string;
  campos: string[];
  validaciones: string[];
}

export interface IReglas {
  nacionalidades_permitidas: string[];
  sexos_permitidos: string[];
  motivos_permitidos: string[];
  discrepancias_para_denegar: string[];
  horarios_de_entrada: {
    inicio: string;
    fin: string;
  };
}

export interface IEvento {
  id_evento: string;
  nombre: string;
  descripcion: string;
  efectos: {
    [key: string]: number | string;
  };
}

export interface IPenalizacion {
  tipo: string;
  razon: string;
  monto?: number;
  max_advertencias?: number;
}

export interface ITurno {
  nombre: string;
  inicio: string;
  fin: string;
}

export interface ITiempo {
  turnos: ITurno[];
  duracion_dia_minutos: number;
}
