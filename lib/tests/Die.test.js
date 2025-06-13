import { Die } from "@/lib/Die";

test("Must throw 1 to 6", () => {
  const D = new Die();
  D.roll();
  expect(D.value).toBeLessThan(7);
});
