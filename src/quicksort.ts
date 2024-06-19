import { MaxNumberValue, SecondInMicroseconds } from "./constants.js";
import {  GenerateRandomNumbers } from "./util.js"

export const benchmarkQuicksort = (dataSize: number): number => {
    if (dataSize <= 1) {
        return 0;
    }
    
    const randomNumberArray : number[] = GenerateRandomNumbers(dataSize, MaxNumberValue);

    const startTime = process.hrtime();

    quicksort(randomNumberArray);

    const diff = process.hrtime(startTime);

    // return seconds of the time it took to execute quicksort
    return (diff[0] * 1000000 + diff[1] / 1000) / SecondInMicroseconds;
}

const quicksort = (dataArray: number[]) => {
    if (dataArray.length <= 1) return dataArray;

    let pivot = dataArray[0];
    let leftArr = [];
    let rightArr = [];
  
    for (let i = 1; i < dataArray.length; i++) {
      if (dataArray[i] < pivot) {
        leftArr.push(dataArray[i]);
      } else {
        rightArr.push(dataArray[i]);
      }
    }
  
    return [...quicksort(leftArr), pivot, ...quicksort(rightArr)];
}
