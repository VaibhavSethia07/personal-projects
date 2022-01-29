const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Event = require("../../models/event");
const User = require("../../models/user");

const eventCreator = (userId) => {
  return User.findById(userId)
    .then((user) => {
      if (!user) return new Error("The creator of the Event doesn't exit");
      return {
        ...user._doc,
        password: null,
        createdEvents: events.bind(this, user._doc.createdEvents),
      };
    })
    .catch((err) => {
      throw err;
    });
};

const events = (eventIds) => {
  // Find all the events whose `id` is in `eventIds`
  return Event.find({ id: { $in: eventIds } })
    .then((events) => {
      return events.map((event) => {
        // Override the creator field, by JavaScript hoisting
        return {
          ...event._doc,
          // Refactor the date in the proper format
          date: new Date(event._doc.date).toISOString(),
          creator: eventCreator.bind(this, event.creator),
        };
      });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  events: () => {
    return Event.find()
      .then((events) => {
        return events.map((event) => {
          // We call the function expression using `bind()` and `this` keyword and pass the arguments
          return {
            ...event._doc,
            // Refactor the date in the proper format
            date: new Date(event._doc.date).toISOString(),
            creator: eventCreator.bind(this, event._doc.creator),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  /* In the GraphQL schema, we have the wriiten that we store User object in the `creator` field of every event. But
        on the Database side we are storing the ID of the user as a reference. So when we try to hit the database with a 
        nested query to enquire about the creator, we get the error that ID does not have any property. Same is the case
        with User object as well. To solve this we are going to create functions that does the work of fetching the creator
        and the created events */
  createEvent: (args) => {
    const eventInput = args.eventInput;

    const event = new Event({
      title: eventInput.title,
      description: eventInput.description,
      price: +eventInput.price,
      date: new Date(eventInput.date),
      creator: "61f3943c7ad99a997249fcb6",
    });

    let createdEvent;
    return event
      .save()
      .then((result) => {
        // Add the creator to the event created
        createdEvent = {
          ...result._doc,
          // Refactor the date in the proper format
          date: new Date(event._doc.date).toISOString(),
          creator: eventCreator.bind(this, result._doc.creator),
        };
        return User.findById("61f3943c7ad99a997249fcb6");
      })
      .then((user) => {
        if (!user) return new Error("User doesn't exist!");
        user.createdEvents.push(event);
        return user.save();
      })
      .then((result) => {
        return createdEvent;
      })
      .catch((err) => {
        throw err;
      });
  },
  users: () => {
    return User.find()
      .then((users) => {
        return users.map((user) => {
          return {
            ...user._doc,
            password: null,
            createdEvents: events.bind(this, user._doc.createdEvents),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  createUser: (args) => {
    const userInput = args.userInput;
    return User.findOne({ email: userInput.email })
      .then((user) => {
        if (user) return new Error("User already exits!");

        return bcrypt
          .hash(userInput.password, 12)
          .then((hashedPassword) => {
            const user = new User({
              email: userInput.email,
              password: hashedPassword,
              mobile: userInput.mobile,
              gender: userInput.gender,
              age: userInput.age,
              createdEvents: [
                "61f3f36773c3ea4967480c19",
                "61f4063132f3c45ef7cf11a4",
              ],
            });

            return user.save();
          })
          .then((result) => {
            return {
              ...result._doc,
              password: null,
              createdEvents: events.bind(this, result._doc.createdEvents),
            };
          });
      })
      .catch((err) => {
        throw err;
      });
  },
};
