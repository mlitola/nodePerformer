import { assert } from "chai";
import { benchmarkBubblesort, bubblesort } from "../src/sort/bubblesort.js"

describe("Bubblesort - benchmarkBubblesort tests", () => {
    it("should return number of seconds the execution took time", () => {
        const secs = benchmarkBubblesort(10);
        assert.isNumber(secs);
    });

    it("should return zero below one data sizes", () => {
        const secs = benchmarkBubblesort(0);
        assert.equal(secs, 0);
    });
});

describe("Bubblesort - bubblesort tests", () => {
    it("should sort number array into ascending order", () => {
        const testData = [5, 8, 11, 3];
        bubblesort(testData, testData.length);
        assert.equal(testData[0], 3);
        assert.equal(testData[1], 5);
        assert.equal(testData[2], 8);
        assert.equal(testData[3], 11);
    });
});
