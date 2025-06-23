export enum GameStatus {
  PLAYING,
  DEAD,
  WON,
}

export type GameState = {
  round: number;
  maxHand: number;
  hand: number;
  maxRoll: number;
  roll: number;
  score: number;
  status: GameStatus;
};

export type GameStateProps = {
  state: GameState;
  dispatch: React.ActionDispatch<[action: GameStateAction]>;
};

export type GameStateAction = {
  type: "roll" | "hand" | "round" | "reset" | "setScore";
  payload?: any;
};
