export interface Spells {
  school: School;
  name: string;
  spellId?: string;
  tomeId?: string;
  skillLevel: string;
  tomeValue?: number;
  magickaCost?: number;
  skillXP?: number;
  effect: string;
}

export type School = "Alteration Spells" | "Conjuration Spells" | "Destruction Spells" | "Illusion Spells" | "Restoration Spells" | "Spell Notes";
