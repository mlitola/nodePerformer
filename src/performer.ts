import express, { Express, Request, Response } from "express";
import { benchmarkBubblesort } from "./sort/bubblesort.js";
import { benchmarkHeapsort } from "./sort/heapsort.js";
import { benchmarkMergesort } from "./sort/mergesort.js"
import { benchmarkQuicksort } from "./sort/quicksort.js";
import { benchmarkSearch, SearchAlgorithm } from "./search/search.js";
import { HundredMillion, Million, HundredThousand } from "./constants.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const performer : Express = express();
const port = process.env.PORT || 8080;

performer.get('/', (req : Request, res: Response) => {
  res.sendFile(path.resolve(process.env.HTMLPATH));
});

//
// Sorting algorithms
//
performer.get('/bubblesort', (req : Request, res: Response) => {
  // Using smaller data size for bubble sort, as it is the slowest 
  const secs = benchmarkBubblesort(HundredThousand);
  sendResponse(res, secs, "Bubblesort", HundredThousand);
});

performer.get('/heapsort', (req : Request, res: Response) => {
  const secs = benchmarkHeapsort(Million);
  sendResponse(res, secs, "Heapsort", Million);
});

performer.get('/mergesort', (req : Request, res: Response) => {
  const secs = benchmarkMergesort(Million);
  sendResponse(res, secs, "Mergesort", Million);
});

performer.get('/quicksort', (req : Request, res: Response) => {
  const secs = benchmarkQuicksort(Million);
  sendResponse(res, secs, "Quicksort", Million);
});

//
// Search algorithms
//
performer.get('/linearsearch', (req : Request, res: Response) => {
  const secs = benchmarkSearch(SearchAlgorithm.Linear, HundredMillion);
  sendResponse(res, secs, SearchAlgorithm.Linear, HundredMillion);
});

performer.get('/binarysearch', (req : Request, res: Response) => {
  const secs = benchmarkSearch(SearchAlgorithm.Binary, Million);
  sendResponse(res, secs, SearchAlgorithm.Binary, Million);
});

performer.get('/jumpsearch', (req : Request, res: Response) => {
  const secs = benchmarkSearch(SearchAlgorithm.Jump, Million);
  sendResponse(res, secs, SearchAlgorithm.Jump, Million);
});

performer.get('/ternarysearch', (req : Request, res: Response) => {
  const secs = benchmarkSearch(SearchAlgorithm.Ternary, Million);
  sendResponse(res, secs, SearchAlgorithm.Ternary, Million);
});

const sendResponse = (
  res: Response,
  seconds: number,
  algorithmName: string,
  dataSize: number
) => {
  const msg = `${algorithmName} for data size: ${dataSize} took ${seconds.toFixed(8)} seconds.`;
  
  console.log(msg);
  
  res.send(msg);
} 

performer.listen(port, () => {
  console.log(`Performer running at port ${port}`);
});
