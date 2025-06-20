import { Dice, Die } from "@/lib/Die";

test("Must throw 1 to 6", () => {
  let i = 0;

  while (i < 1000) {
    ++i;
    const D = new Die();
    expect(D.value).toBeGreaterThan(0);
    expect(D.value).toBeLessThan(7);
  }
});

test("Must throw 1 to 4", () => {
  let i = 0;

  while (i < 1000) {
    ++i;
    const D = new Die(4);
    expect(D.value).toBeGreaterThan(0);
    expect(D.value).toBeLessThan(5);
  }
});

test("Must count and sort hands correctly", () => {
  expect(
    JSON.stringify(
      Dice.getCountArr([
        ["1", 2],
        ["2", 2],
        ["4", 1],
      ])
    )
  ).toBe('[{"rank":1,"count":2},{"rank":2,"count":2},{"rank":4,"count":1}]');
  expect(
    JSON.stringify(
      Dice.getCountArr([
        ["1", 2],
        ["2", 2],
        ["5", 2],
      ])
    )
  ).toBe('[{"rank":1,"count":2},{"rank":5,"count":2},{"rank":2,"count":2}]');
  expect(
    JSON.stringify(
      Dice.getCountArr([
        ["1", 3],
        ["2", 2],
        ["4", 2],
        ["6", 3],
        ["5", 4],
        ["3", 4],
      ])
    )
  ).toBe(
    '[{"rank":5,"count":4},{"rank":3,"count":4},{"rank":1,"count":3},{"rank":6,"count":3},{"rank":4,"count":2},{"rank":2,"count":2}]'
  );

  let D = Dice.generate([1, 2, 3, 3, 5]);
  expect(D.length).toBe(5);
  expect(Dice.getHand(D)).toStrictEqual({ base: 4, scoredDie: [2, 3], mult: 2, name: "Pair of 3" });
  D = Dice.generate([2, 2, 1, 1, 5]);
  expect(Dice.getHand(D)).toStrictEqual({ base: 8, scoredDie: [0, 1, 2, 3], mult: 2, name: "Two Pairs 102" });
  D = Dice.generate([4, 4, 1, 4, 4]);
  expect(Dice.getHand(D)).toStrictEqual({ base: 24, scoredDie: [0, 1, 3, 4], mult: 7, name: "Four of a Kind 4" });
  D = Dice.generate([4, 3, 3, 3, 4]);
  expect(Dice.getHand(D)).toStrictEqual({ base: 16, mult: 4, name: "Full House 34", scoredDie: [0, 1, 2, 3, 4] });
  D = Dice.generate([4, 5, 3, 1, 6]);
  expect(Dice.getHand(D)).toStrictEqual({ base: 8, mult: 3, name: "???", scoredDie: [0, 1, 2, 3, 4] });
  D = Dice.generate([2, 5, 3, 4, 6]);
  expect(Dice.getHand(D)).toStrictEqual({ base: 12, mult: 4, name: "Straight", scoredDie: [0, 1, 2, 3, 4] });
  D = Dice.generate([1, 2, 5, 3, 4]);
  expect(Dice.getHand(D)).toStrictEqual({ base: 12, mult: 4, name: "Straight", scoredDie: [0, 1, 2, 3, 4] });
  D = Dice.generate([4, 5, 3, 1, 6]);
  expect(Dice.getHand(D)).toStrictEqual({ base: 8, mult: 3, name: "???", scoredDie: [0, 1, 2, 3, 4] });
  D = Dice.generate([1, 5, 2, 4, 6]);
  expect(Dice.getHand(D)).toStrictEqual({ base: 8, mult: 3, name: "???", scoredDie: [0, 1, 2, 3, 4] });
  D = Dice.generate([6, 6, 6, 6, 6]);
  expect(Dice.getHand(D)).toStrictEqual({ base: 48, mult: 7, name: "Knockout 6!", scoredDie: [0, 1, 2, 3, 4] });
});
