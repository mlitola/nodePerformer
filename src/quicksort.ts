import { MaxNumberValue, SecondInMicroseconds } from "./constants.js";
import {  GenerateRandomNumbers } from "./util.js"

export const benchmarkQuicksort = (dataSize: number): number => {
    if (dataSize <= 1) {
        return 0;
    }
    
    const randomNumberArray : number[] = GenerateRandomNumbers(dataSize, MaxNumberValue);

    const startTime = process.hrtime();

    quicksort(randomNumberArray, 0, dataSize - 1);

    const diff = process.hrtime(startTime);

    // return seconds of the time it took to execute quicksort
    return (diff[0] * SecondInMicroseconds + diff[1] / 1000) / SecondInMicroseconds;
}

export const quicksort = (dataArray: number[], lowValue: number, highValue: number) => {
    if (lowValue < highValue) {
        const partitionIndex = partitionArray(dataArray, lowValue, highValue);

        quicksort(dataArray, lowValue, partitionIndex - 1);
        quicksort(dataArray, partitionIndex + 1, highValue);
    }
}

const partitionArray = (dataArray: number[], lowValue: number, highValue: number): number => {
    const pivotValue = dataArray[highValue];

    let i = lowValue - 1;

    for (let j = lowValue; j <= highValue; j++) {
        if  (dataArray[j] < pivotValue) {
          i++;
          const swapValue = dataArray[i];
          dataArray[i] = dataArray[j];
          dataArray[j] = swapValue;
        }
    }

    dataArray[highValue] = dataArray[i + 1];
    dataArray[i + 1] = pivotValue;

    return i + 1;
}
