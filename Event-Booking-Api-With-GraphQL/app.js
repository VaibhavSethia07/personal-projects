const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/isAuth");
const app = express();

app.use(bodyParser.json());

/*  This middleware will execute for every incoming request. And every incoming request will have `isAuth` field.
    We can use this field in the resolvers as well. Because the functions not only receive `args` as the argument but the
    request as well. So we can check for the authentication before creating the event.

    Now for all those resolvers where we are authenticating we need the request object. In the GraphiQL we cannot attach
    the header so we use Postman for testing those resolvers

    Steps
    1.  Query the login resolver to genereate the token and copy it
    2.  In the Postman select `POST` method type, and url `http://localhost:3000/graphql` 
    3.  Go to the body select JSON and raw
    4.  Type in the GraphQL query in the `query` key in singleline.
    5.  Use `\` before and after the string
    Eg:
    {
      "query": "mutation { createEvent(eventInput: {title: \"This should work\", description: \"As the user is authenticated\", price: 3.99, date: \"2022-01-30T15:56:09.503Z\"}){_id title description price date}}"
    } 
    6.  Then in the Authentication choose Bearer Token and provide the token you copied without quotes
    7. Hit the API
*/
app.use(isAuth);

/*  If we want to lock down access to certain operations such as createEvent() then we can use an auth middleware to check
    whether the user has a valid token or not */
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
