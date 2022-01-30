const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./merge");

module.exports = {
  events: () => {
    return Event.find()
      .then((events) => {
        return events.map((event) => {
          // We call the function expression using `bind()` and `this` keyword and pass the arguments
          return transformEvent(event);
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
      creator: "61f51ad623f279bffdafb4d7",
    });

    let createdEvent;
    return event
      .save()
      .then((result) => {
        // Add the creator to the event created
        createdEvent = transformEvent(result);
        return User.findById("61f51ad623f279bffdafb4d7");
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
};
