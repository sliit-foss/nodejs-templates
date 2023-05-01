import {
    addTwoNumbers,
    substractTwoNumbers
  } from "../src";
  
  
  
describe("test addTwoNumbers func", () => {
    test("test both numbers positive", async () => {
      
      expect(addTwoNumbers(1+2)).toBe(3);
    });
    test("test both numbers negative", async () => {
      
      expect(addTwoNumbers(-1+(-2)).toBe(-3));
    });
  });
  
  describe("test substractTwoNumbers func", () => {
    test("test both numbers positive", async () => {
      
      expect(substractTwoNumbers(1-2)).toBe(-1);
    });
    test("test both numbers negative", async () => {
      
      expect(substractTwoNumbers(-1-2)).toBe(-3);
    });
  });
