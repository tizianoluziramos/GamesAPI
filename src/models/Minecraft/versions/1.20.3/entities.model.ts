export interface Entities {
  id: number;
  internalId: number;
  name: string;
  displayName: string;
  width: number;
  height: number;
  type: Type;
  category: Category;
}

export enum Category {
  HostileMobs = "Hostile mobs",
  Immobile = "Immobile",
  PassiveMobs = "Passive mobs",
  Projectiles = "Projectiles",
  Unknown = "UNKNOWN",
  Vehicles = "Vehicles",
}

export enum Type {
  Ambient = "ambient",
  Animal = "animal",
  Hostile = "hostile",
  Living = "living",
  Mob = "mob",
  Other = "other",
  Passive = "passive",
  Player = "player",
  Projectile = "projectile",
  WaterCreature = "water_creature",
}
