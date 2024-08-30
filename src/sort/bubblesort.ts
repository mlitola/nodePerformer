import { MaxNumberValue } from "../constants.js";
import {  GenerateRandomNumbers, GetElapsedSeconds } from "../util.js"

export const benchmarkBubblesort = (dataSize: number): number => {
    if (dataSize <= 1) {
        return 0;
    }
    
    const randomNumberArray : number[] = GenerateRandomNumbers(dataSize, MaxNumberValue);

    const startTime = process.hrtime();

    bubblesort(randomNumberArray, dataSize);

    const elapsedSeconds = GetElapsedSeconds(startTime);

    return elapsedSeconds;
}
export const  bubblesort = (dataArray: number[], dataSize: number) => {
    let valueSwapped: boolean;

    for (let i = 0; i < dataSize; i++) {
        valueSwapped = false;

        for (let j = 0; j < dataSize - i - 1; j++) {
            if (dataArray[j] > dataArray[j + 1]) {
                const val = dataArray[j];
                dataArray[j] = dataArray[j + 1];
                dataArray[j + 1] = val;
                valueSwapped = true;  
            }
        }

        if (valueSwapped === false) {
            break;
        }
    }
}
