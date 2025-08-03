export interface Items {
  armors: ConsumableItem[];
  "Consumable items": ConsumableItem[];
  "Miscellaneous items": ConsumableItem[];
  Weapons: ConsumableItem[];
}

export interface ConsumableItem {
  pageid: number;
  ns: number;
  title: string;
}
