import express, { Express, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const performer : Express = express();
const port = process.env.PORT || 8080;

performer.get('/', (req : Request, res: Response) => {
  res.sendFile(path.resolve(process.env.HTMLPATH));
});

performer.listen(port, () => {
  console.log(`Performer running at port ${port}`);
});
