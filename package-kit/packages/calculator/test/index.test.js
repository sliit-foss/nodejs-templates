import { add, subtract } from "../src";

describe("add-tests", () => {
  test("test both numbers positive", () => {
    expect(add(1, 2)).toBe(3);
  });
  test("test both numbers negative", () => {
    expect(add(-1, -2)).toBe(-3);
  });
});

describe("subtract-tests", () => {
  test("test both numbers positive", () => {
    expect(subtract(1, 2)).toBe(-1);
  });
  test("test both numbers negative", () => {
    expect(subtract(-1, -2)).toBe(1);
  });
});