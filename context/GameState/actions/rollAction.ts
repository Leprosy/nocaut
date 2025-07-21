import { Die } from "@/lib/Die";
import { GameStateActionHandler } from "../types";

export const rollAction: GameStateActionHandler = (state, payload) => {
  const newDice = Array(5); // TODO: only 5 die?

  for (let i = 0; i < 5; ++i) {
    if (state.selected.indexOf(i) < 0) {
      newDice[i] = new Die();
    } else {
      newDice[i] = state.dice[i];
    }
  }

  return { ...state, roll: state.roll < state.maxRoll ? state.roll + 1 : state.roll, dice: newDice };
};
