import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { type GraphQLFieldResolver, buildSchema } from "graphql";
import fs from "fs";

interface Ingredient {
  id: number;
  name: string;
  quantity: string;
}

interface Recipe {
  id: number;
  name: string;
  steps: string;
  ingredients: Ingredient[];
}

interface Resolvers {
  pid: GraphQLFieldResolver<never, any>;
  recipe: GraphQLFieldResolver<never, any, { id: number }>;
}

const schema = buildSchema(
  fs.readFileSync("../shared/graphql-schema.gql", "utf8").toString()
);

const app = express();

const resolvers: Resolvers = {
  pid: () => process.pid,
  recipe: async ({ id }): Promise<Recipe> => {
    if (Number(id) !== 42) {
      throw new Error("Not Found");
    }

    return {
      id,
      name: "Chicken Tikka Masala",
      steps: "Throw it in a pot...",
      ingredients: [
        { id: 1, name: "Chicken", quantity: "1 lb" },
        { id: 2, name: "Sauce", quantity: "2 cups" },
      ],
    };
  },
};

const root = {
  pid: resolvers.pid,
  recipe: resolvers.recipe,
};

app.use("/graphql", createHandler({ schema, rootValue: root }));

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
