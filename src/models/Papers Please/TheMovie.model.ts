export interface FilmDataEnglish {
  title: string;
  year: number;
  duration: string;
  directors: string[];
  original_creator: string;
  country: string;
  original_language: string;
  genres: string[];
  synopsis: string;
  cast: {
    actor: string;
    character: string;
  }[];
  available_on: string[];
  links: {
    youtube: string;
    steam: string;
    vimeo: string;
  };
  images: string[];
  themes: string[];
  awards: string[];
  inspiration: string;
  relation_to_game: {
    setting: string;
    fidelity: string;
    shared_elements: string[];
  };
  reception: {
    critical: string;
    highlighted_comments: string[];
    community_rating: number;
  };
}

export interface FilmDataSpanish {
  titulo: string;
  anio: number;
  duracion: string;
  directores: string[];
  creador_original: string;
  pais: string;
  idioma_original: string;
  genero: string[];
  sinopsis: string;
  elenco: {
    actor: string;
    personaje: string;
  }[];
  plataformas_disponibles: string[];
  enlaces: {
    youtube: string;
    steam: string;
    vimeo: string;
  };
  imagenes: string[];
  temas: string[];
  premios: string[];
  inspiracion: string;
  relacion_con_el_juego: {
    ambientacion: string;
    fidelidad: string;
    detalles_compartidos: string[];
  };
  recepcion: {
    critica: string;
    comentarios_destacados: string[];
    valoracion_comunidad: number;
  };
}

export interface FilmDataPortuguese {
  titulo: string;
  ano: number;
  duracao: string;
  diretores: string[];
  criador_original: string;
  pais: string;
  idioma_original: string;
  genero: string[];
  sinopse: string;
  elenco: {
    ator: string;
    personagem: string;
  }[];
  plataformas_disponiveis: string[];
  links: {
    youtube: string;
    steam: string;
    vimeo: string;
  };
  imagens: string[];
  temas: string[];
  premios: string[];
  inspiracao: string;
  relacao_com_o_jogo: {
    ambientacao: string;
    fidelidade: string;
    elementos_compartilhados: string[];
  };
  recepcao: {
    critica: string;
    comentarios_destaque: string[];
    avaliacao_comunidade: number;
  };
}

export interface iTheMovie {
  english: FilmDataEnglish;
  spanish: FilmDataSpanish;
  portuguese: FilmDataPortuguese;
}
