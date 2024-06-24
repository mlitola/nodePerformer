import { quicksort } from "./quicksort.js";
import { MaxNumberValue, SecondInMicroseconds } from "./constants.js";
import {  GenerateRandomNumbers } from "./util.js"

type SearchAlgorithm = 'linearsearch' | 'binarysearch' | 'jumpsearch' | 'ternarysearch';

export const benchmarkSearch = (algorithm: SearchAlgorithm, dataSize: number): number => {
    if (dataSize <= 1) {
        return 0;
    }
    
    const randomNumberArray : number[] = GenerateRandomNumbers(dataSize, MaxNumberValue);
    
    randomNumberArray[dataSize] = -1;

    const startTime = process.hrtime();

    if (algorithm === "linearsearch") {
        doLinearSearch(randomNumberArray);
    }

    const diff = process.hrtime(startTime);

    // return seconds of the time it took to execute quicksort
    return (diff[0] * SecondInMicroseconds + diff[1] / 1000) / SecondInMicroseconds;
}

export const doLinearSearch = (numberArray: number[]): boolean => {
    for (let i = 0; i < numberArray.length; i++) {
        if (numberArray[i] < 0) {
            return true;
        }
    }

    return false;
}
