import express, { Express, Request, Response } from "express";
import { QuickSort } from "./quicksort.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const performer : Express = express();
const port = process.env.PORT || 8080;

const dataSize = 1000000;

performer.get('/', (req : Request, res: Response) => {
  res.sendFile(path.resolve(process.env.HTMLPATH));
});

performer.get('/quicksort', (req : Request, res: Response) => {
  const secs = QuickSort(dataSize);
  const msg = getResultMessage("Quicksort", secs);
  
  console.log(msg);
  res.send(msg);
});

performer.get('/bubblesort', (req : Request, res: Response) => {
  res.send("TBD...");
});

performer.get('/mergesort', (req : Request, res: Response) => {
  res.send("TBD...");
});

performer.get('/heapsort', (req : Request, res: Response) => {
  res.send("TBD...");
});

const getResultMessage = (algorithName: string, secs: number) => {
  return `${algorithName} for data size: ${dataSize} took ${secs.toFixed(8)} seconds.`;
}

performer.listen(port, () => {
  console.log(`Performer running at port ${port}`);
});
