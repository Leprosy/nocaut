import { Dice } from "@/lib/Die";
import { GameStateActionHandler } from "../types";

export const playHandAction: GameStateActionHandler = (state, payload) => {
  const { dice } = state;

  const handData = Dice.getHand(dice);
  payload(handData);
  let points = 0;
  /* 
      // Hand
      await executeWait(() => setLog([...log, "You got " + handData.name]), DISPLAY_DELAY);

      // Base
      points += handData.base;
      await executeWait(() => setLog([...log, "Base " + handData.base]), DISPLAY_DELAY);

      // Dice
      const scored = dice.filter((i, j) => handData.scoredDie.indexOf(j) >= 0);
      scored.forEach((die) => (points += die.value === 1 ? 10 : die.value));
      await executeWait(
        () => setLog([...log, scored.map((die) => (die.value === 1 ? 10 : die.value)).join("+")]),
        DISPLAY_DELAY
      );

      // Mult
      points *= handData.mult;
      await executeWait(() => setLog([...log, "X " + handData.mult]), DISPLAY_DELAY);

      // Total
      await executeWait(() => setLog([...log, "TOTAL : " + points]), DISPLAY_DELAY);

      dispatch({ type: "setScore", payload: score + points });
      dispatch({ type: "hand" });
      cleanUp();
 */
  return { ...state };
};
