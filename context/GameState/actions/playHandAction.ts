import { Dice } from "@/lib/Die";
import { GameStateActionHandler } from "../types";

export const playHandAction: GameStateActionHandler = (state, payload) => {
  const { dice, perks, roll } = state;
  const handData = Dice.getHand(dice, roll === 0);
  let points = 0;
  let log = [];

  // Hand
  log = ["You got " + handData.name];

  // Base
  points += handData.base;
  log.push("Base " + handData.base);

  // Perk Base
  perks.forEach((perk) => {
    if (perk.totalIncrease) {
      points += perk.totalIncrease;
      log.push(perk.name + ": Base " + perk.totalIncrease);
    }
  });

  // Dice
  const scored = dice.filter((i, j) => handData.scoredDie.indexOf(j) >= 0);
  scored.forEach((die) => (points += die.value === 1 ? 10 : die.value));
  log.push(scored.map((die) => (die.value === 1 ? 10 : die.value)).join("+"));

  // Mult
  points *= handData.mult;
  log.push("X " + handData.mult);

  // Perk Mult
  perks.forEach((perk) => {
    if (perk.totalMult) {
      points *= perk.totalMult;
      log.push(perk.name + ": X " + perk.totalMult);
    }
  });

  // Total
  log.push("TOTAL : " + points);

  payload({ points, log });
  return { ...state };
};
