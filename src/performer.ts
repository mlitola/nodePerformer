import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const performer : Express = express();
const port = process.env.Port || 8080;

performer.get('/', (req : Request, res: Response) => {
  res.send('Node Performer');
  // TODO: list default endpoints here
});

performer.listen(port, () => {
  console.log(`Performer running at port ${port}`);
});
