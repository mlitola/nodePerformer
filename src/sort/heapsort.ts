import { MaxNumberValue } from "../constants.js";
import {  GenerateRandomNumbers, GetElapsedSeconds } from "../util.js"

export const benchmarkHeapsort = (dataSize: number): number => {
    if (dataSize <= 1) {
        return 0;
    }
    
    const randomNumberArray : number[] = GenerateRandomNumbers(dataSize, MaxNumberValue);

    const startTime = process.hrtime();

    heapsort(randomNumberArray, dataSize);

    const elapsedSeconds = GetElapsedSeconds(startTime);

    return elapsedSeconds;
}
export const heapsort = (dataArray: number[], dataSize: number) => {
    for (let i = Math.floor(dataSize / 2) - 1; i >= 0; i--) {
        createHeapFromArray(dataArray, dataSize, i);
    }
  
    for (let i = dataSize - 1; i > 0; i--) {
        const swapValue = dataArray[0];
        dataArray[0] = dataArray[i];
        dataArray[i] = swapValue;

        createHeapFromArray(dataArray, i, 0);
    }
}

const createHeapFromArray = (dataArray: number[], dataSize: number, index: number) => {
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    let largestValue = index;

    if  (left < dataSize && dataArray[left] > dataArray[largestValue]) {
        largestValue = left;
    }

    if  (right < dataSize && dataArray[right] > dataArray[largestValue]) {
        largestValue = right;
    }

    if (largestValue != index) {
        const swapValue = dataArray[index];
        dataArray[index] = dataArray[largestValue];
        dataArray[largestValue] = swapValue;

        createHeapFromArray(dataArray, dataSize, largestValue);
    }
}
