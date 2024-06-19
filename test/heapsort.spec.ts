import { assert } from "chai";
import { benchmarkHeapsort } from "../src/heapsort.js"

describe("Heapsort Tests", () => {
   describe("benchmarkHeapsort Tests", () => {
        it("should return number of seconds the execution took time", () => {
            const secs = benchmarkHeapsort(10);
            assert.isNumber(secs);
        });

        it("should return zero below one data sizes", () => {
            const secs = benchmarkHeapsort(0);
            assert.equal(secs, 0);
        });
    });
});
