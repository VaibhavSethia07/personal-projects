const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  /*  A user should be connected to events. Either they should create events or they book event. `createdEvents` is an 
        array of events, where each item is an event.
    */
  createdEvents: [
    {
      // Each event stored will be an object and type would be `Schema.Types.ObjectId` abd it will refer to `Events`
      type: Schema.Types.ObjectId,
      // The `ref` field allows Mongoose to set relationship and let Mongoose know the 2 models are related
      ref: "Event",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
