export enum DieMaterial {
  Default,
  Gold,
  Silver,
  Bronze,
}

export type Hand = {
  name: string;
  base: number;
  mult: number;
  scoredDie: number[];
};

export type countData = {
  rank: number;
  count: number;
};

export type DieAnim = "roll" | "error" | "flip";

export type Perk = {
  // TODO: number | function ? more advanced perks?
  id: number;

  name: string;
  description: string;

  handMod?: string;
  handIncrease?: number;
  handMult?: number;

  dieMod?: number;
  dieIncrease?: number;
  dieMult?: number;

  totalIncrease?: number;
  totalMult?: number;
};
