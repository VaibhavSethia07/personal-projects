const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = express();
const Event = require("./models/event");
const User = require("./models/user");

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    /* Here the password is nullable because we are never going to display the password.*/
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            mobile: String!
            gender: String!
            age: Int!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
            mobile: String!
            gender: String!
            age: Int!
        }

        type RootQuery {
            events: [Event!]!
            users: [User!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then((events) => {
            return events.map((event) => {
              return { ...event._doc };
            });
          })
          .catch((err) => {
            throw err;
          });
      },
      createEvent: (args) => {
        const eventInput = args.eventInput;

        const event = new Event({
          title: eventInput.title,
          description: eventInput.description,
          price: +eventInput.price,
          date: new Date(eventInput.date),
          // Attaching user by hardcoding the user-id for now. Mongoose automatically understands this string is an ID
          creator: "61f3793fdb919cf9af992256",
        });

        let createdEvent;
        return event
          .save()
          .then((result) => {
            createdEvent = { ...result._doc };
            // Before return the response, we will edit the user. We find the user and return it. We then recive the user
            // in then() block
            return User.findById("61f3793fdb919cf9af992256");
          })
          .then((user) => {
            if (!user) return new Error("User doesn't exist!");

            user.createdEvents.push(event);
            return user.save();
          }) // This then block is for the result of above then block which returns the use
          .then((result) => {
            return createdEvent;
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
      users: () => {
        return User.find()
          .then((result) => {
            return { ...result._doc };
          })
          .catch((err) => {
            throw err;
          });
      },
      createUser: (args) => {
        const userInput = args.userInput;

        /* Before we even create a user, we look if the user we are creating exists in the database. If it exists, we throw
        error, otherwise we create the user */
        return User.findOne({ email: userInput.email })
          .then((user) => {
            // If there is no error
            if (user) return new Error("User already exists!");
            /*  If we store the password as plain text, then it would be a huge security flaw as if our database gets
                hacked or an employee steals the information then the passwords of all the users will be exposed. To prevent
                this we encrypt the password using `bcryptjs` package's `hash(password,# of rounds)` function. It returns
                a promise. This hashed password can't be decrypted
            */
            return (
              bcrypt
                .hash(userInput.password, 12)
                .then((hashedPassword) => {
                  const user = new User({
                    email: userInput.email,
                    password: hashedPassword,
                    mobile: userInput.mobile,
                    gender: userInput.gender,
                    age: userInput.age,
                  });

                  return user.save();
                })
                // Here we have the result of the user.save()
                .then((result) => {
                  // We don't want to return the password
                  return { ...result._doc, password: null };
                })
            );
          })
          .catch((err) => {
            throw err;
          });
      },
    },
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
