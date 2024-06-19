import { assert, expect } from "chai";
import { GenerateRandomNumbers } from "../src/util";

describe("Util Tests", () => {
   describe("GenerateRandomNumbers Tests", () => {
      it("should generate random number array of specific length", () => {
         const numbers = GenerateRandomNumbers(10, 10);
         assert.equal(numbers.length, 10);
      });

      it("should generate random numbers that are numbers", () => {
         const numbers = GenerateRandomNumbers(10, 10);
         for (const item of numbers) {
            assert.isNumber(item);
         } 
      });

      it("should generate random numbers that are in specific range", () => {
         const numbers = GenerateRandomNumbers(10, 10);
         for (const item of numbers) {
            expect(item).not.to.be.below(0);
            expect(item).to.be.below(11);
         }

      });

      it("generate random numbers return empty array for smaller than one data size", () => {
         const numbers = GenerateRandomNumbers(0, 10);
         assert.equal(numbers.length, 0); 
      });
   });
});