import { assert } from "chai";
import { benchmarkSearch, doLinearSearch } from "../src/search.js";

describe("Search - benchmark search tests", () => {
    it("should return number of seconds the execution took time", () => {
        const secs = benchmarkSearch("linearsearch", 10);
        assert.isNumber(secs);
    });

    it("should return zero below one data sizes", () => {
        const secs = benchmarkSearch("linearsearch", 0);
        assert.equal(secs, 0);
    });
});

describe("Search - linear search tests", () => {
    it("should return true after value is found", () => {
        const testData = [5, 8, 11, 3, -1];
        const result = doLinearSearch(testData);
        assert.isTrue(result);
    });

    it("should return false if no value is found", () => {
        const testData = [5, 8, 11, 3];
        const result = doLinearSearch(testData);
        assert.isFalse(result);
    });
});
