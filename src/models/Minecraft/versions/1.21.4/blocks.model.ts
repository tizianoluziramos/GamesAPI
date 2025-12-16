export interface Blocks {
  id: number;
  name: string;
  displayName: string;
  hardness: number;
  resistance: number;
  stackSize: number;
  diggable: boolean;
  material: Material;
  transparent: boolean;
  emitLight: number;
  filterLight: number;
  defaultState: number;
  minStateId: number;
  maxStateId: number;
  states: State[];
  drops: number[];
  boundingBox: BoundingBox;
  harvestTools?: { [key: string]: boolean };
}

export enum BoundingBox {
  Block = "block",
  Empty = "empty",
}

export enum Material {
  Coweb = "coweb",
  Default = "default",
  GourdMineableAxe = "gourd;mineable/axe",
  IncorrectForWoodenTool = "incorrect_for_wooden_tool",
  LeavesMineableHoe = "leaves;mineable/hoe",
  MineableAxe = "mineable/axe",
  MineableHoe = "mineable/hoe",
  MineablePickaxe = "mineable/pickaxe",
  MineableShovel = "mineable/shovel",
  PlantMineableAxe = "plant;mineable/axe",
  SwordInstantlyMines = "sword_instantly_mines",
  VineOrGlowLichenPlantMineableAxe = "vine_or_glow_lichen;plant;mineable/axe",
  Wool = "wool",
}

export interface State {
  name: string;
  type: Type;
  num_values: number;
  values?: string[];
}

export enum Type {
  Bool = "bool",
  Enum = "enum",
  Int = "int",
}
