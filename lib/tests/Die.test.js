import { Die } from "@/lib/Die";

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
