const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// For convinient fetching of bookings we create a separate model
const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      rquired: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // `timestamps: true` includes the `createdAt` and `updatedAt` fields in the mongoose model automatically
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
