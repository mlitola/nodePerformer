import { MaxNumberValue } from "../constants.js";
import {  GenerateRandomNumbers, GetElapsedSeconds } from "../util.js"

export const benchmarkMergesort = (dataSize: number): number => {
    if (dataSize <= 1) {
        return 0;
    }
    
    const randomNumberArray : number[] = GenerateRandomNumbers(dataSize, MaxNumberValue);

    const startTime = process.hrtime();

    mergesort(randomNumberArray, 0, dataSize - 1);

    const elapsedSeconds = GetElapsedSeconds(startTime);

    return elapsedSeconds;
}

export const mergesort = (dataArray: number[], beginVal: number, endVal: number) => {
    if (beginVal >= endVal) {
        return dataArray;
    }

    const middleVal = beginVal + Math.floor((endVal - beginVal) / 2);
    mergesort(dataArray, beginVal, middleVal);
    mergesort(dataArray, middleVal + 1, endVal);
    merge(dataArray, beginVal, middleVal, endVal);
}

const merge = (
    dataArray: number[], 
    beginVal: number, 
    middleVal: number,
    endVal: number
) => {
    const leftArrayLen = middleVal - beginVal + 1;
    const rightArrayLen = endVal - middleVal;

    const leftArray = new Array<number>(leftArrayLen);
    const rightArray = new Array<number>(rightArrayLen); 

    for (let i = 0; i < leftArrayLen; i++) {
        leftArray[i] = dataArray[beginVal + i];
    }

    for (let j = 0; j < rightArrayLen; j++) {
        rightArray[j] = dataArray[middleVal + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = beginVal;

    while (i < leftArrayLen && j < rightArrayLen) {
        if (leftArray[i] <= rightArray[j]) {
            dataArray[k] = leftArray[i];
            i++;
        }
        else {
            dataArray[k] = rightArray[j];
            j++;
        }
        k++;
    }

    while (i < leftArrayLen) {
        dataArray[k] = leftArray[i];
        i++;
        k++;
    }

    while (j < rightArrayLen) {
        dataArray[k] = rightArray[j];
        j++;
        k++;
    }
}
