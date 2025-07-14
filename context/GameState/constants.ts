import { GameStatus } from "./types";

export const initialState = {
  round: 1,
  maxHand: 4,
  hand: 0,
  maxRoll: 2,
  roll: 0,
  score: 0,
  status: GameStatus.PLAYING,
};

export const ROUND_POINTS = 300;
