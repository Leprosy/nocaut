import { Dice, Die } from "@/lib/Die";
import { GameStateActionHandler } from "../types";

export const flipAction: GameStateActionHandler = (state, payload) => {
  if (state.roll <= 1) return { ...state };

  const die = state.dice[payload];
  const fliped = Dice.getFlipDie(die.value);
  const newDie = new Die();
  newDie.value = fliped || 0;
  newDie.roll = die.roll;
  newDie.anim = "flip"; // XD

  return { ...state, dice: state.dice.toSpliced(payload, 1, newDie) };
};
