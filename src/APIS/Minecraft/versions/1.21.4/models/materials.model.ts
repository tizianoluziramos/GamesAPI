export interface Materials {
  default: Default;
  leaves: { [key: string]: number };
  coweb: { [key: string]: number };
  plant: { [key: string]: number };
  gourd: { [key: string]: number };
  vine_or_glow_lichen: VineOrGlowLichen;
  wool: VineOrGlowLichen;
  sword_instantly_mines: { [key: string]: number };
  sword_efficient: { [key: string]: number };
  incorrect_for_wooden_tool: { [key: string]: number };
  "mineable/shovel": { [key: string]: number };
  "mineable/pickaxe": { [key: string]: number };
  "mineable/axe": { [key: string]: number };
  "mineable/hoe": { [key: string]: number };
  incorrect_for_stone_tool: { [key: string]: number };
  incorrect_for_gold_tool: { [key: string]: number };
  incorrect_for_iron_tool: { [key: string]: number };
  incorrect_for_diamond_tool: { [key: string]: number };
  incorrect_for_netherite_tool: { [key: string]: number };
  "plant;mineable/axe": { [key: string]: number };
  "gourd;mineable/axe": { [key: string]: number };
  "leaves;mineable/hoe": { [key: string]: number };
  "leaves;mineable/axe;mineable/hoe": { [key: string]: number };
  "vine_or_glow_lichen;plant;mineable/axe": { [key: string]: number };
}

export interface Default {}

export interface VineOrGlowLichen {
  "1060": number;
}
