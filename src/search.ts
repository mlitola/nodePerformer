import { MaxNumberValue, SecondInMicroseconds } from "./constants.js";
import {  GenerateRandomNumbers } from "./util.js"
import { BinarySearchTree } from "./binarySearchTree.js";

type SearchAlgorithm = 'linearsearch' | 'binarysearch' | 'jumpsearch' | 'ternarysearch';

const valueToFound = -1;

export const benchmarkSearch = (algorithm: SearchAlgorithm, dataSize: number): number => {
    if (dataSize <= 1) {
        return 0;
    }
    
    const randomNumberArray : number[] = GenerateRandomNumbers(dataSize, MaxNumberValue);
    
    randomNumberArray[dataSize] = valueToFound;

    let startTime = process.hrtime();

    if (algorithm === "linearsearch") {
        doLinearSearch(randomNumberArray);
    } else if (algorithm === "binarysearch") {
        const bst = buildBinarySearchTree(randomNumberArray);

        const buildTime = process.hrtime(startTime);
        const buildTimeInSeconds = (buildTime[0] * SecondInMicroseconds + buildTime[1] / 1000) / SecondInMicroseconds;
        console.log(`Binary search tree build took time ${buildTimeInSeconds} seconds`);

        startTime = process.hrtime();

        bst.search(bst.root, valueToFound);
    }

    const diff = process.hrtime(startTime);

    // return seconds of the time it took to execute quicksort
    return (diff[0] * SecondInMicroseconds + diff[1] / 1000) / SecondInMicroseconds;
}

export const doLinearSearch = (numberArray: number[]): boolean => {
    for (let i = 0; i < numberArray.length; i++) {
        if (numberArray[i] === valueToFound) {
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