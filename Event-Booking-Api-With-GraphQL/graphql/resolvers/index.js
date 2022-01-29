const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");

// These functions are used to drill into user and event
const eventCreator = (userId) => {
  return User.findById(userId)
    .then((user) => {
      if (!user) return new Error("The creator of the Event doesn't exit");
      return {
        ...user._doc,
        password: null,
        createdEvents: allEvents.bind(this, user._doc.createdEvents),
      };
    })
    .catch((err) => {
      throw err;
    });
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) return new Error("Event doesn't exist");
    return {
      ...event._doc,
      date: new Date(event._doc.date).toISOString(),
      creator: eventCreator.bind(this, event._doc.creator),
    };
  } catch (error) {
    throw error;
  }
};

const allEvents = (eventIds) => {
  // Find all the events whose `id` is in `eventIds`
  return Event.find({ _id: { $in: eventIds } })
    .then((events) => {
      if (!events) return [];
      return events.map((event) => {
        // Override the creator field, by JavaScript hoisting
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
  /*  In the GraphQL schema, we have the wriiten that we store User object in the `creator` field of every event. But
      on the Database side we are storing the ID of the user as a reference. So when we try to hit the database with a 
      nested query to enquire about the creator, we get the error that ID does not have any property. Same is the case
      with User object as well. To solve this we are going to create functions that does the work of fetching the creator
      and the created events
  */
  createEvent: (args) => {
    const eventInput = args.eventInput;

    const event = new Event({
      title: eventInput.title,
      description: eventInput.description,
      price: +eventInput.price,
      date: new Date(eventInput.date),
      creator: "61f51ac523f279bffdafb4d4",
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
        return User.findById("61f51ac523f279bffdafb4d4");
      })
      .then((user) => {
        if (!user) return new Error("User doesn't exist!");
        // For pushing the event to createdEvents list, we are doing this kind of approach
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
            createdEvents: allEvents.bind(this, user._doc.createdEvents),
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
              createdEvents: [],
            });

            return user.save();
          })
          .then((result) => {
            return {
              ...result._doc,
              password: null,
              createdEvents: allEvents.bind(this, result._doc.createdEvents),
            };
          });
      })
      .catch((err) => {
        throw err;
      });
  },
  // We create an async function. So we need to use try-catch block and `await` before returning the result
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        // Maintain the consistency of data types at the Mongoose and the GraphQL end
        return {
          ...booking._doc,
          event: singleEvent.bind(this, booking._doc.event),
          user: eventCreator.bind(this, booking._doc.user),
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString(),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  // Always use args to access the arguments
  bookEvent: async (args) => {
    try {
      const booking = new Booking({
        // `createdAt` and `updatedAt` timestamps will be automatically added by Mongoose
        event: args.eventId,
        user: args.userId,
      });

      const result = await booking.save();
      return {
        ...result._doc,
        event: singleEvent.bind(this, booking._doc.event),
        user: eventCreator.bind(this, booking._doc.user),
        createdAt: new Date(result._doc.createdAt).toISOString(),
        updatedAt: new Date(result._doc.updatedAt).toISOString(),
      };
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args) => {
    try {
      const eventId = await Booking.find({ _id: args.bookingId }).event;
      const result = await Booking.deleteOne({ _id: args.bookingId });
      if (!result) return new Error("Booking doesn't exist");
      return singleEvent(eventId);
    } catch (error) {
      throw error;
    }
  },
};
