import { assert } from "chai";
import { benchmarkBubblesort } from "../src/bubblesort.js"

describe("Bubblesort Tests", () => {
   describe("benchmarkBubblesort Tests", () => {
        it("should return number of seconds the execution took time", () => {
            const secs = benchmarkBubblesort(10);
            assert.isNumber(secs);
        });

        it("should return zero below one data sizes", () => {
            const secs = benchmarkBubblesort(0);
            assert.equal(secs, 0);
        });
    });
});
