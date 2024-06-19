import express, { Express, Request, Response } from "express";
import { benchmarkBubblesort } from "./bubblesort.js";
import { benchmarkMergesort } from "./mergesort.js"
import { benchmarkQuicksort } from "./quicksort.js";
import { Million, HundredThousand } from "./constants.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const performer : Express = express();
const port = process.env.PORT || 8080;

const dataSize = Million;

performer.get('/', (req : Request, res: Response) => {
  res.sendFile(path.resolve(process.env.HTMLPATH));
});

performer.get('/bubblesort', (req : Request, res: Response) => {
  // Using smaller data size for bubble sort, as it is the slowest 
  const secs = benchmarkBubblesort(HundredThousand);
  sendResponse(res, secs, "Bubblesort");
});

performer.get('/heapsort', (req : Request, res: Response) => {
  res.send("TBD...");
});

performer.get('/mergesort', (req : Request, res: Response) => {
  const secs = benchmarkMergesort(dataSize);
  sendResponse(res, secs, "Mergesort");
});

performer.get('/quicksort', (req : Request, res: Response) => {
  const secs = benchmarkQuicksort(dataSize);
  sendResponse(res, secs, "Quicksort");
});

const sendResponse = (res: Response, seconds: number, algorithmName: string) => {
  const msg = `${algorithmName} for data size: ${dataSize} took ${seconds.toFixed(8)} seconds.`;
  
  console.log(msg);
  
  res.send(msg);
} 

performer.listen(port, () => {
  console.log(`Performer running at port ${port}`);
});
