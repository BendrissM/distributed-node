import express from "express";
import https from "https";
import fs from "fs";

const app = express();

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || "127.0.0.1";

console.log("worker pid", process.pid);

app.get("/recipes/:id", (req, res) => {
  console.log("worker request pid", process.pid);
  const id = Number(req.params.id);
  if (id !== 42) {
    return res.status(404).json({ message: "Not Found" });
  }

  return res.json({
    producer_pid: process.pid,
    recipe: { id, name: "Chicken Tikka Masala", steps: "Throw it in a pot..." },
    ingredients: [
      { id: 1, name: "Chicken", quantity: "1 lb" },
      { id: 2, name: "Sauce", quantity: "2 cups" },
    ],
  });
});

const httpsOptions = {
  key: fs.readFileSync('tls/basic-private-key.key'),
  cert: fs.readFileSync('../shared/tls/basic-certificate.cert')
};

https.createServer(httpsOptions, app).listen(PORT, HOST, () => {
  console.log(`Producer is running https on port ${PORT}`);
});
