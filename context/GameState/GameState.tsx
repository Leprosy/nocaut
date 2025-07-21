import { createContext, PropsWithChildren, useContext, useReducer } from "react";
import { rollAction } from "./actions";
import { initialState, ROUND_POINTS } from "./constants";
import { GameState, GameStateAction, GameStateProps, GameStatus } from "./types";

const GameStateContext = createContext<GameStateProps | null>(null);

const reducer = (state: GameState, action: GameStateAction) => {
  let newState: GameState;

  switch (action.type) {
    case "reset":
      return initialState;
    case "round":
      newState = {
        ...state,
        roll: initialState.roll,
        score: initialState.score,
        hand: initialState.hand,
        round: state.round + 1,
      };
      break;
    case "hand":
      newState = { ...state, roll: initialState.roll, hand: state.hand < state.maxHand ? state.hand + 1 : state.hand };
      break;
    case "roll":
      newState = rollAction(state, action.payload);
      break;
    case "setScore":
      newState = { ...state, score: parseInt(action.payload!) };
      break;
    case "setSelected":
      newState = { ...state, selected: action.payload };
  }

  // check status
  if (newState.score >= newState.round * ROUND_POINTS) {
    newState = { ...newState, status: GameStatus.WON };
  } else if (newState.hand === newState.maxHand) {
    newState = { ...newState, status: GameStatus.DEAD };
  } else {
    newState = { ...newState, status: GameStatus.PLAYING };
  }

  console.log("state updated", newState);
  return newState;
};

export const GameStateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GameStateContext.Provider value={{ state, dispatch }}>{children}</GameStateContext.Provider>;
};

export const useGameStateContext = () => {
  const context = useContext(GameStateContext);

  if (!context) {
    throw new Error("useStateContext has to be used within <StateContext.Provider>");
  }

  return context;
};
