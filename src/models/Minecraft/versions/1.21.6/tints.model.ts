export interface Tints {
  grass: Constant;
  foliage: Constant;
  water: Constant;
  redstone: Redstone;
  constant: Constant;
}

export interface Constant {
  data: ConstantDatum[];
}

export interface ConstantDatum {
  keys: string[];
  color: number;
}

export interface Redstone {
  data: RedstoneDatum[];
}

export interface RedstoneDatum {
  keys: number[];
  color: number;
}
