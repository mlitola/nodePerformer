import { assert } from "chai";
import { benchmarkMergesort } from "../src/mergesort.js"

describe("Mergesort Tests", () => {
   describe("benchmarkMergesort Tests", () => {
        it("should return number of seconds the execution took time", () => {
            const secs = benchmarkMergesort(10);
            assert.isNumber(secs);
        });

        it("should return zero below one data sizes", () => {
            const secs = benchmarkMergesort(0);
            assert.equal(secs, 0);
        });
    });
});
