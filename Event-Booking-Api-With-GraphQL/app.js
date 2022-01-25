const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

const events = []

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    /* We create a custom type `Event`. This defines how a real event looks like. We use _id for storing ID because
       MongoDB also uses _id for storing ID. Since every event needs to have an ID we use !. GraphQL doesn't have Date 
       data type so we use String.
    */
    /* Instead of using very long argument list, we can use `input` type. This type tells GraphQL that it is used as a
       list of arguments  
    */
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        /* We query like this:
            query {
                events {
                    title,
                    description,
                    date
                }
            }
           In events we define what fields we are interested in.
        */
        events: () => {
            return events;
        },
        /* We mutate event like this:
            mutation {
                createEvent(eventInput: {title: "Vaibhav Sethia", description: "3rd Year student",price:7,date: "2022-01-25T05:24:28.782Z"}){
                    // Since we are return the event we need to define what all fields we need to return
                    title
                    description
                    price
                }
            }
        */
        // We create the event from the arguments
        createEvent: (args) => {
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                // If the argument is not in float `+` converts it into float
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date).toISOString()
            }
            events.push(event);
            return event;
        }
    },
    graphiql: true
})
);

app.listen(3000, (req, res) => {
    console.log('🚀 Server listening at port 3000...');
})

