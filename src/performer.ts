import express, { Express, Request, Response } from "express";
import { benchmarkBubblesort } from "./bubblesort.js";
import { benchmarkHeapsort } from "./heapsort.js";
import { benchmarkMergesort } from "./mergesort.js"
import { benchmarkQuicksort } from "./quicksort.js";
import { Million, HundredThousand } from "./constants.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const performer : Express = express();
const port = process.env.PORT || 8080;

performer.get('/', (req : Request, res: Response) => {
  res.sendFile(path.resolve(process.env.HTMLPATH));
});

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
