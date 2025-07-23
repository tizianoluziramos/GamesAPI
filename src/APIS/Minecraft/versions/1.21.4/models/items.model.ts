export interface Items {
  id: number;
  name: string;
  displayName: string;
  stackSize: number;
  enchantCategories?: string[];
  maxDurability?: number;
  repairWith?: string[];
}
