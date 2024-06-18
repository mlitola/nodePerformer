const maxValue: number = Number.MAX_SAFE_INTEGER;

const secondInMicroseconds = 1000000;

export const QuickSort = (dataSize: number): number => {
    if (dataSize <= 1) {
        return 0;
    }
    
    // generate random number array that corresponds dataSize
    const sortableData : number[] = generateRandomInts(dataSize, maxValue);

    const startTime = process.hrtime();

    doSorting(sortableData);

    const diff = process.hrtime(startTime);

    // return seconds of the time it took to execute quicksort
    return (diff[0] * 1000000 + diff[1] / 1000) / secondInMicroseconds;
}

const doSorting = (dataArray: number[]) => {
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
  
    return [...doSorting(leftArr), pivot, ...doSorting(rightArr)];
}

const generateRandomInts = (dataSize: number, customMaxVal: number | undefined): number[] => {
    const randIntArr : number[] = [];

    for (let i = 0; i < dataSize; i++) {
        const val = Math.floor(Math.random() * maxValue);
        randIntArr.push(val);
    }
    return randIntArr;
}
