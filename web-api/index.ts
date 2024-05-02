import express from "express";
import zlib from 'zlib';
import fs from 'fs';

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const TARGET = process.env.TARGET || "localhost:4000";

console.log("worker pid", process.pid);

app.get("/", async (req, res) => {
  const data = await fetch(`http://${TARGET}/recipes/42`);
  const producerData = await data.json();

  return res.json({
    consumer_pid: process.pid,
    producerData,
  });
});

app.get('/compress', async (req, res) => {
    const raw = fs.createReadStream('index.html');
    const acceptEncoding = req.headers['accept-encoding'] || '';
    console.log('accept encoding', acceptEncoding);
    if (!acceptEncoding) {
        console.log('no accept encoding');
        raw.pipe(res);
        return;
    }

    if (acceptEncoding.includes('gzip')) {
        console.log('gzip');
        res.set('Content-Encoding', 'gzip');
        raw.pipe(zlib.createGzip()).pipe(res);
        return;
    }
});

app.listen(PORT, HOST, () => {
  console.log(`Consumer is running on port ${PORT}`);
});
