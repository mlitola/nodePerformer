export const GenerateRandomNumbers = (dataSize: number, maxVal: number | undefined): number[] => {
    const randIntArr : number[] = [];

    for (let i = 0; i < dataSize; i++) {
        const val = Math.floor(Math.random() * maxVal);
        randIntArr.push(val);
    }
    return randIntArr;
}
