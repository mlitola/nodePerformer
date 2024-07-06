import { assert } from "chai";
import {
  benchmarkSearch,
  buildBinarySearchTree,
  linearSearch,
  jumpSearch,
  SearchAlgorithm
} from "../src/search/search.js";
import { GenerateAscendingNumbers } from "../src/util.js";

const testData = [5, 8, 11, 3, 77];
describe("Search - benchmark search tests", () => {
    it("should return number of seconds the execution took time for linear search", () => {
        const secs = benchmarkSearch(SearchAlgorithm.Linear, 100);
        assert.isNumber(secs);
    });

    it("should return number of seconds the execution took time for binary search tree", () => {
        const secs = benchmarkSearch(SearchAlgorithm.Binary, 100);
        assert.isNumber(secs);
    });

    it("should return number of seconds the execution took time for jump search", () => {
        const secs = benchmarkSearch(SearchAlgorithm.Jump, 100);
        assert.isNumber(secs);
    });

    it("should return zero below one data sizes", () => {
        const secs = benchmarkSearch(SearchAlgorithm.Linear, 0);
        assert.equal(secs, 0);
    });
});

describe("Search - linear search tests", () => {
    it("should return true after value is found", () => {
        const result = linearSearch(testData, 77);
        assert.isTrue(result);
    });

    it("should return false if no value is found", () => {
        const result = linearSearch(testData, 78);
        assert.isFalse(result);
    });
});

describe("Search - binary search tree tests", () => {
    it("should return buildBinarySearchTree for data array", () => {
        const bst = buildBinarySearchTree(testData);
        assert.isDefined(bst);
    });

    it("should find designated node from binary tree", () => {
        const bst = buildBinarySearchTree(testData);
        const node = bst.search(bst.root, 77);
        assert.isDefined(node);
        assert.equal(node.value, 77);
    });
});

describe("Search - jump search tests", () => {
    it("should return true after value is found", () => {
        const numberArray = GenerateAscendingNumbers(300);
        const result = jumpSearch(numberArray, 77, 0);
        assert.isTrue(result);
    });

    it("should return false if no value is found", () => {
        const result = jumpSearch(testData, 78, 0);
        assert.isFalse(result);
    });
});