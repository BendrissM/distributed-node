import express from "express";
import fs from "fs";
import nodeFetch, { RequestInit } from "node-fetch";
import https from "https";

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const TARGET = process.env.TARGET || "localhost:4000";

console.log("worker pid", process.pid);

const fetchOptions: RequestInit = {
  agent: new https.Agent({
    ca: fs.readFileSync("../shared/tls/basic-certificate.cert"),
  }),
};

app.get("/", async (req, res) => {
  const data = await nodeFetch(`https://${TARGET}/recipes/42`, fetchOptions);
  const producerData = await data.json();

  return res.json({
    consumer_pid: process.pid,
    producerData,
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Consumer is running on port ${PORT}`);
});
