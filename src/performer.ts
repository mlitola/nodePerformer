import { createServer } from 'http';

const LOCALHOST = '127.0.0.1';
const PORT = 8080;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Node Performer');
});

server.listen(PORT, LOCALHOST, () => {
  console.log(`Performer running at http://${LOCALHOST}:${PORT}/`);
});
