import { assert } from "chai";
import { benchmarkQuicksort, quicksort } from "../src/quicksort.js";

describe("Quicksort - benchmarkQuicksort tests", () => {
    it("should return number of seconds the execution took time", () => {
        const secs = benchmarkQuicksort(10);
        assert.isNumber(secs);
    });

    it("should return zero below one data sizes", () => {
        const secs = benchmarkQuicksort(0);
        assert.equal(secs, 0);
    });
});

describe("Quicksort - quicksort tests", () => {
    it("should sort number array into ascending order", () => {
        const testData = [5, 8, 11, 3];
        quicksort(testData, 0, testData.length - 1);
        assert.equal(testData[0], 3);
        assert.equal(testData[1], 5);
        assert.equal(testData[2], 8);
        assert.equal(testData[3], 11);
    });
});
