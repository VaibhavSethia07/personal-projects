const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const app = express();

app.use(bodyParser.json());

/* The app.js is becoming lengthy so we restructure it. We create a folder `graphql` and inside it create `schema` and
    `resolver`. These 2 folders have `index.js` which have the schema and resolver section code*/
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.twc7a.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000, (req, res) => {
      console.log("🚀 Server listening at port 3000...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
