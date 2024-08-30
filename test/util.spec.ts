import { assert, expect } from "chai";
import { GenerateRandomNumbers, GenerateAscendingNumbers, GetElapsedSeconds } from "../src/util";

describe("GenerateRandomNumbers Tests", () => {
   it("should generate random number array of specific length", () => {
      const numbers = GenerateRandomNumbers(10, 10);
      assert.equal(numbers.length, 10);
   });

   it("should generate random numbers that are in specific range", () => {
      const numbers = GenerateRandomNumbers(10, 10);
      for (const item of numbers) {
         expect(item).not.to.be.below(0);
         expect(item).to.be.below(11);
      }

   });

   it("returns an empty array for smaller than one data size", () => {
      const numbers = GenerateRandomNumbers(0, 10);
      assert.equal(numbers.length, 0);
   });
});

describe("GenerateAscendingNumbers Tests", () => {
   it("should generate number array of specific length", () => {
      const numbers = GenerateAscendingNumbers(10);
      assert.equal(numbers.length, 10);
   });

   it("should generate numbers that are in ascending order", () => {
      const numbers = GenerateAscendingNumbers(5);
      assert.equal(numbers[0], 1);
      assert.equal(numbers[1], 2);
      assert.equal(numbers[2], 3);
      assert.equal(numbers[3], 4);
      assert.equal(numbers[4], 5);
   });

   it("returns an empty array for smaller than one data size", () => {
      const numbers = GenerateAscendingNumbers(0);
      assert.equal(numbers.length, 0);
   });
});

describe("GetElapsedSeconds Tests", () => {
   it("should return non-zero value", () => {
      const time = process.hrtime();
      const seconds = GetElapsedSeconds(time);
      assert.notEqual(seconds, 0);
   });
});
