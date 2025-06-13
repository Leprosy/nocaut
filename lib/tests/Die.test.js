import { Dice, Die } from "@/lib/Die";

test("Must throw 1 to 6", () => {
  let i = 0;

  while (i < 1000) {
    ++i;
    const D = new Die();
    D.roll();
    expect(D.value).toBeGreaterThan(0);
    expect(D.value).toBeLessThan(7);
  }
});

test("Must throw 1 to 4", () => {
  let i = 0;

  while (i < 1000) {
    ++i;
    const D = new Die();
    D.maxValue = 4;
    D.roll();
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

  const D = new Dice(5);
  expect(D.dice.length).toBe(5);
  D.setDice([1, 2, 3, 3, 4]);
  expect(D.getHand()).toBe("pair 3");
  D.setDice([2, 2, 1, 1, 5]);
  expect(D.getHand()).toBe("two pairs 1/2");
  D.setDice([4, 4, 1, 4, 4]);
  expect(D.getHand()).toBe("four of a kind 4");
  D.setDice([4, 3, 3, 3, 4]);
  expect(D.getHand()).toBe("full house 3/4");
});
