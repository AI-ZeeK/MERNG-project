import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
const color = colors;
dotenv.config();
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
const app = express();
const PORT = process.env.PORT || 8080;
// connectDB();
app.use(cors());
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
}));
app.listen(PORT, () => console.log(`Server running on https:localhost:${PORT}`.magenta.bold));
