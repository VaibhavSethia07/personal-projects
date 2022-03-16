const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
// `buildSchema` is a function that takes the template string that defines the schema
const { buildSchema } = require("graphql");

const app = express();
app.use(bodyParser.json());
/* 
    app.use() takes in the endpoint (common convention is to use `/graphql`) and a middleware function `graphqlHttp()`.
    In the `graphqlHttp()` we pass a JavaScript object where we configure the GraphQL API. The object contains schema and
    resolvers key. The schema contains the endpoints and the resolver contains the routes to which the request should be
    forwarded.
*/
app.use(
  "/graphql",
  graphqlHTTP({
    /* `schema` takes 2 keys: query and mutation. `query` is used for fetching data and `mutation` is used to 
      change data */
    /* `type` Since GraphQL is a typed language. It works with types to define what an endpoint returns. By convention
        we use names such as `RootQuery` and `RootMutation`. In both of them we define the endpoints
    */
    /* In the schema we point to`RootQuery` and `RootMutation` */
    /* In the `RootQuery` if we want to return a list of events then we specify the `event` property and value is the
       type of list of strings. We use '!' to specify the string/list cannot be null
    */
    /* In the `RootMutation` we may create event. This can be done by specifying `createEvent` function which returns a
       String. 
    */
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    /* So the `events` and the `createEvent` needs to be supported by our GraphQL API. The logic of this is provided in
        `rootValue`
    */
    // `rootValue` contains a JavaScript object which contains all the resolvers. The resolvers are the functions
    rootValue: {
      events: () => {
        return [
          "Vaibhav Sethia",
          "Competitive Programmer",
          "Pre-final year student",
        ];
      },
      // `args` is an object holding all the arguments. `events` can also arguments
      createEvent: (args) => {
        const eventName = args.name;
        return `Event ${eventName} created!`;
      },
    },
    // To get an interface to hit the GraphQL endpoint use `graphiql` property. Go to `http://localhost:3000/graphql`
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("🚀 Server listening at port 3000...");
});
