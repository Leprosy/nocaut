import { GameStateActionHandler } from "../types";

export const selectAction: GameStateActionHandler = (state, payload) => {
  let newSelected = [];
  console.log(state.selected, payload);
  if (state.selected.includes(payload)) {
    newSelected = state.selected.filter((i) => i !== payload);
  } else {
    newSelected = [...state.selected, payload];
  }
  console.log(newSelected);
  return { ...state, selected: newSelected };
};
