import { Perk } from "./types";

export const Perks: Perk[] = [
  {
    id: 0,
    name: "First plus",
    description: "Add to your first die",
    dieMod: 0,
    dieIncrease: 2,
  },
  {
    id: 1,

    name: "Second pow ",
    description: "Power your second die",
    dieMod: 1,
    dieMult: 2,
  },
  {
    id: 2,
    name: "Greater Pairs",
    description: "Increase Pairs",
    handMod: "Two Pairs",
    handIncrease: 2,
    handMult: 2,
  },
  {
    id: 10,
    name: "Third plus",
    description: "Add to your 3rd die",
    dieMod: 0,
    dieIncrease: 2,
  },
  {
    id: 11,

    name: "Fourth pow",
    description: "Power your 4th die",
    dieMod: 1,
    dieMult: 2,
  },
  {
    id: 12,
    name: "Greater Three of a kind",
    description: "Increase Three of a kind",
    handMod: "Three",
    handIncrease: 2,
    handMult: 2,
  },
  {
    id: 20,
    name: "Points",
    description: "Have a base 50 points",
    totalIncrease: 50,
  },
  {
    id: 21,
    name: "Mults",
    description: "Have a base 2 mult",
    totalMult: 2,
  },
];

export const getRandomPerks = (total: number, exclude: number[]) => {
  let pool = Perks.filter((perk) => !exclude.includes(perk.id));
  let perks: Perk[] = [];

  for (let i = 0; i < total; ++i) {
    console.log("pool", pool);
    if (pool.length === 0) return perks;
    const perk = pool[~~(Math.random() * pool.length)];
    perks.push(perk);
    console.log("perks", perks);
    pool = pool.filter((item) => item.id !== perk.id);
  }

  return perks;
};
