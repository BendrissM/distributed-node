import express from "express";

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const TARGET = process.env.TARGET || "localhost:4000";

const complexQuery = `
    query recipeQuery ($id: ID) {
        recipe(id: $id) {
            id
            name
            ingredients {
                name
                quantity
            }
        }
    }
`;

app.get("/", async (req, res) => {
    const data = await fetch(`http://${TARGET}/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: complexQuery,
            variables: { id: 42 },
        }),
  });
  const producerData = await data.json();

  return res.json({
    consumer_pid: process.pid,
    producerData,
  });
});

app.listen(PORT, HOST, () => {
  console.log(`GraphQL Consumer is running on port ${PORT}`);
});
