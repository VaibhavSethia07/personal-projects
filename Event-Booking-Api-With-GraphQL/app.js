const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const app = express();
// We use capital E because the model returned is a constructor function. We now have the constructor object
const Event = require('./models/event');

app.use(bodyParser.json());

/*  To persist our data we are using MongoDB. We can use any other database as well with GraphQL. GraphQL works with any
    database because we have to write the logic to interact with the database. We are using MongoDB Atlas which is hosted
    on cloud, inorder to avoid administrating and setting up database.
    
    Inorder to connect to database we need to do 2 things
    1.  In the MongoDB Atlas Clusters page, go to Security section to manage the security settings of the cluster to allow
        our application to connect to database.
    
    2.  We use a driver in our application to query our database. This is needed because we are not going to write queries
        but expose some methods that execute against the database

    In the Security section, we need to have atleast 1 user that is an Admin or can Read/WriteAnyDatabase. Then we need to
    specify which servers can connect to the database. To do this we need to add our local machine's IP address to the 
    IP Whitelist of database

    Then we use Mongoose, a third-party library which allows us to work with models. In this way we can manage our data 
    through JavaScript objects, for ex: we can save the objects, execute certain methods on it. All this is translated to
    a query that executes against the database.
    
    We install the package using the following command
    const mongoose = require('mongoose');

    Now instead of starting the server with `npm run start`, we create `nodemon.json` file. This file will be used by 
    nodemon tool and it will help us to add configurations for the nodemon. In this file we pass in the environment 
    variables that contain database sign in credentials. In this way we can use our credentials locally and later deploy
    them. This file will be automatically be consumed by nodemon. Also nodemon does not pick changes from nodemon.json.
    Therefore we need to restart the app.
*/

app.use('/graphql', graphqlHTTP({
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
        events: () => {
            /*  To return the events we can use `Event`constructor. This constructor has static methods which we can call
                on data.
                Event.find() -> allows us to find the documents in the collection. We can also filter the data, for eg:
                Event.find({
                    title: 'Test'
                })
                This find() also works like a promise

                We return the data, this indicates the GraphQL that we are performing async operation, wait for it to 
                complete and then return the data
            */
            return Event.find()
                .then(events => {
                    /*We could have returned events, but the data that we return has some meta data. So we use map() and
                      that transforms every event into a new object using spread operator
                    */
                    return events.map(event => {
                        return { ...event._doc };
                    });
                    /*  If some field is not properly read such as _id, then we can take that field out and convert it into
                        string and map it to original field before returning
                        return events.map(event => {
                            return { ...event._doc, _id: event._doc._id.toString() };
                        });

                        OR use property provided by Mongoose
                        return events.map(event => {
                            return { ...event._doc, _id: event.id };
                        });
                        Notice that we have used id instead of _id.
                    */
                })
                .catch(err => {
                    throw err;
                });
        },
        createEvent: (args) => {
            const eventInput = args.eventInput;
            // const event = {
            //     title: eventInput.title,
            //     description: eventInput.description,
            //     price: +eventInput.price,
            //     date: new Date(eventInput.date).toISOString()
            // }
            const event = new Event({
                title: eventInput.title,
                description: eventInput.description,
                price: +eventInput.price,
                date: new Date(eventInput.date)
            })
            /*  Now we don't need the `events` array. We use the `save()` provided by the Mongoose package. The save
                function returns an object which works like a promise.
            */
            /*   We should use return before obj.save() so that `express-graphql` get to know this function executes async
                 operation and it should wait for it to complete. If we do not write it will complete instantly and will 
                 not yeild correct result.
            */
            return event.save().then(result => {
                console.log(result);
                /* We can use
                    return event; 
                   But it will return enriched data along with meta-data. Instead we can use spread operator (...) provided
                   by Mongoose and use `_doc` to get all the core properties
                */
                return { ...result._doc };
            }
            ).catch(err => {
                console.log(err);
                throw err;
            }
            );

        }
    },
    graphiql: true
}))
// Establishing connection to MongoDB Atlas via Mongoose. Connection string is the address of our database cluster
// Now we can run server using `npm run start`
mongoose.connect(
    // If the database doesn't exist it will be created on the fly.
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.twc7a.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000, (req, res) => {
            console.log("🚀 Server listening at port 3000...");
        })
    })
    .catch((err) => {
        console.log(err);
    })

//  To use strongly typed modelling feature of MongoDB, we create `models` folder and a file `event.js`.  
