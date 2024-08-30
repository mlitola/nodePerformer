import { SecondInMicroseconds } from "./constants.js";

export const GetElapsedSeconds = (startTime: [number, number]): number => {
    const diff = process.hrtime(startTime);

    return (diff[0] * SecondInMicroseconds + diff[1] / 1000) / SecondInMicroseconds;
}

export const GenerateRandomNumbers = (dataSize: number, maxVal: number): number[] => {
    if (dataSize < 1) {
        return [];
    }

    const randIntArr : number[] = [];
    
    for (let i = 0; i < dataSize; i++) {
        const val = Math.floor(Math.random() * maxVal);
        randIntArr.push(val);
    }
    return randIntArr;
}

export const GenerateAscendingNumbers = (dataSize: number): number[] => {
    if (dataSize < 1) {
        return [];
    }

    const intArr : number[] = [];

    for (let i = 0; i < dataSize; i++) {
        intArr.push(i + 1);
    }
    return intArr;
}
