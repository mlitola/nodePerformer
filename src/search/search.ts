import { MaxNumberValue, SecondInMicroseconds } from "../constants.js";
import {  GenerateRandomNumbers } from "../util.js"
import { BinarySearchTree } from "./binarySearchTree.js";
import { HundredThousand, JumpSearchStep } from "../constants.js";
import { quicksort } from "../sort/quicksort.js";

export enum SearchAlgorithm {
    Linear = "Linear Search",
    Binary ="Binary Search",
    Jump = "Jump Search",
    Ternary = "Ternary Search"
};

export const benchmarkSearch = (algorithm: SearchAlgorithm, dataSize: number): number => {
    if (dataSize <= 1) {
        return 0;
    }
    
    const randomNumberArray : number[] = GenerateRandomNumbers(dataSize, MaxNumberValue);
    
    // Insert a 100 000 value that the search algorithm needs to find
    const valueToBeFound = HundredThousand;

    randomNumberArray[dataSize - 1] = valueToBeFound;

    let startTime = process.hrtime();

    if (algorithm === SearchAlgorithm.Linear) {
        linearSearch(randomNumberArray, 100000);
    } else if (algorithm === SearchAlgorithm.Binary) {
        const bst = buildBinarySearchTree(randomNumberArray);

        const buildTime = process.hrtime(startTime);
        const buildTimeInSeconds = (buildTime[0] * SecondInMicroseconds + buildTime[1] / 1000) / SecondInMicroseconds;
        console.log(`Binary search tree build took time ${buildTimeInSeconds} seconds`);

        startTime = process.hrtime();

        bst.search(bst.root, valueToBeFound);
    } else if (algorithm === SearchAlgorithm.Jump) {
        quicksort(randomNumberArray, 0, dataSize - 1);

        startTime = process.hrtime();

        jumpSearch(randomNumberArray, valueToBeFound, 0);
    } else if (algorithm === SearchAlgorithm.Ternary) {
        quicksort(randomNumberArray, 0, dataSize - 1);

        startTime = process.hrtime();

        ternarySearch(randomNumberArray, valueToBeFound);
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

export const buildBinarySearchTree = (numberArray: number[]): BinarySearchTree => {
    const binarySearchTree = new BinarySearchTree(numberArray[0]);

    for (let i = 1; i < numberArray.length; i++) {
        binarySearchTree.insert(numberArray[i]);
    }

    return binarySearchTree;
}

export const jumpSearch = (numberArray: number[], valueToBeFound: number, index: number): boolean => {
    if (index + JumpSearchStep > numberArray.length) {
        const subArray = numberArray.slice(index, numberArray.length - 1);
        return linearSearch(subArray, valueToBeFound);
    }

    if (numberArray[index] > valueToBeFound) {
        let subArray = [];

        if (index > JumpSearchStep) {
            subArray = numberArray.slice(index - JumpSearchStep, index);
        } else {
            subArray = numberArray.slice(0, index);
        }

        return linearSearch(subArray, valueToBeFound);
    }

    return jumpSearch(numberArray, valueToBeFound, index + JumpSearchStep);
}

export const ternarySearch = (numberArray: number[], valueToBeFound: number): number => {
    const firstElem = 0;
    const lastElem = numberArray.length - 1;

    let mid1 = firstElem + Math.ceil((lastElem - firstElem) / 3);
    let mid2 = lastElem - Math.ceil((lastElem - firstElem) / 3);

    while (mid1 > 0 && mid2 < lastElem) {
        if (valueToBeFound == numberArray[mid1]) {
            return mid1;
        } else if (valueToBeFound == numberArray[mid2]) {
            return mid2;
        }
    
        if (valueToBeFound < numberArray[mid1]) {
            mid1--;
        } else if (valueToBeFound > numberArray[mid2]) {
            mid2++;
        } else if (valueToBeFound > numberArray[mid1] &&
            valueToBeFound < numberArray[mid2]) {
            mid1++;
            mid2--;
        }
    }

    return -1;
}
