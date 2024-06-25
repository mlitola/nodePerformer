import { MaxNumberValue, SecondInMicroseconds } from "../constants.js";
import {  GenerateRandomNumbers } from "../util.js"
import { BinarySearchTree } from "./binarySearchTree.js";
import { HundredThousand } from "../constants.js";
import { quicksort } from "../sort/quicksort.js";

type SearchAlgorithm = "linearsearch" | "binarysearch" | "jumpsearch" | "ternarysearch";

const valueToBeFound = HundredThousand;
const jumpStep = 100;

export const benchmarkSearch = (algorithm: SearchAlgorithm, dataSize: number): number => {
    if (dataSize <= 1) {
        return 0;
    }
    
    const randomNumberArray : number[] = GenerateRandomNumbers(dataSize, MaxNumberValue);
    
    // Insert special value that acts as the value to be found
    randomNumberArray[dataSize - 1] = valueToBeFound;

    let startTime = process.hrtime();

    if (algorithm === "linearsearch") {
        linearSearch(randomNumberArray, 100000);
    } else if (algorithm === "binarysearch") {
        const bst = buildBinarySearchTree(randomNumberArray);

        const buildTime = process.hrtime(startTime);
        const buildTimeInSeconds = (buildTime[0] * SecondInMicroseconds + buildTime[1] / 1000) / SecondInMicroseconds;
        console.log(`Binary search tree build took time ${buildTimeInSeconds} seconds`);

        startTime = process.hrtime();

        bst.search(bst.root, valueToBeFound);
    } else if (algorithm === "jumpsearch") {
        quicksort(randomNumberArray, 0, dataSize - 1);

        startTime = process.hrtime();

        jumpSearch(randomNumberArray, valueToBeFound, 0);
    }

    const diff = process.hrtime(startTime);

    // return seconds of the time it took to execute quicksort
    return (diff[0] * SecondInMicroseconds + diff[1] / 1000) / SecondInMicroseconds;
}

export const linearSearch = (numberArray: number[], valueToBeFound: number): boolean => {
    for (let i = 0; i < numberArray.length; i++) {
        if (numberArray[i] === valueToBeFound) {
            return true;
        }
    }

    return false;
}

export const jumpSearch = (numberArray: number[], valueToBeFound: number, index: number): boolean => {
    if (index + jumpStep > numberArray.length) {
        const subArray = numberArray.slice(index, numberArray.length - 1);
        return linearSearch(subArray, valueToBeFound);
    }

    if (numberArray[index] > valueToBeFound) {
        let subArray = [];

        if (index > jumpStep) {
            subArray = numberArray.slice(index - jumpStep, index);
        } else {
            subArray = numberArray.slice(0, index);
        }

        return linearSearch(subArray, valueToBeFound);
    }

    return jumpSearch(numberArray, valueToBeFound, index + jumpStep);
}

export const buildBinarySearchTree = (numberArray: number[]): BinarySearchTree => {
    const binarySearchTree = new BinarySearchTree(numberArray[0]);

    for (let i = 1; i < numberArray.length; i++) {
        binarySearchTree.insert(numberArray[i]);
    }

    return binarySearchTree;
}
