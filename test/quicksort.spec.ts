import { assert } from "chai";
import { benchmarkQuicksort } from "../src/quicksort.js";

describe("Quicksort Tests", () => {
   describe("benchmarkQuicksort Tests", () => {
        it("should return number of seconds the execution took time", () => {
            const secs = benchmarkQuicksort(10);
            assert.isNumber(secs);
        });

        it("should return zero below one data sizes", () => {
            const secs = benchmarkQuicksort(0);
            assert.equal(secs, 0);
        });
    });
});
