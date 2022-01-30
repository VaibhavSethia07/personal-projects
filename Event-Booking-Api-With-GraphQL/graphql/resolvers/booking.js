const Booking = require("../../models/booking");
const { transformBooking, singleEvent } = require("./merge");
// Since in many API's we are doing the same transformation, we create a separate function for it

module.exports = {
  // We create an async function. So we need to use try-catch block and `await` before returning the result
  bookings: async (args, req) => {
    try {
      // Only the authenticated users should see the bookings
      if (!req.isAuth) {
        return new Error("User unauthenticated!");
      }
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        // Maintain the consistency of data types at the Mongoose and the GraphQL end
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },
  // Always use args to access the arguments
  bookEvent: async (args, req) => {
    try {
      // Only the authenticated users should be able to book an event
      if (!req.isAuth) {
        return new Error("User unauthenticated!");
      }
      const booking = new Booking({
        // `createdAt` and `updatedAt` timestamps will be automatically added by Mongoose
        event: args.eventId,
        user: args.userId,
      });

      const result = await booking.save();
      return transformBooking(result);
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args) => {
    try {
      // Also before cancelling a booking, we check if we are authenticated
      if (!req.isAuth) {
        return new Error("User unauthenticated!");
      }
      // find() returns an array. Also first take the object and then destructure it
      const booking = await Booking.findOne({ _id: args.bookingId });
      const result = await Booking.deleteOne({ _id: args.bookingId });
      if (!result) return new Error("Booking doesn't exist");
      return singleEvent(booking.event);
    } catch (error) {
      throw error;
    }
  },
};
