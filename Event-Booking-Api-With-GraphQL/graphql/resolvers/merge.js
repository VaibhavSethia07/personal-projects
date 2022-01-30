const { dateToString } = require("../../helpers/date");
const Event = require("../../models/event");
const User = require("../../models/user");
// Since in many API's we are doing the same transformation, we create a separate function for it
const transformEvent = (event) => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: eventCreator.bind(this, event._doc.creator),
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    event: singleEvent.bind(this, booking._doc.event),
    user: eventCreator.bind(this, booking._doc.user),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

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
    return transformEvent(event);
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
        return transformEvent(event);
      });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  transformEvent,
  transformBooking,
  eventCreator,
  singleEvent,
  allEvents,
};
