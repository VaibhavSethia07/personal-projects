// Import all the individual resolvers
const userResolver = require("./user");
const eventResolver = require("./event");
const bookingResolver = require("./booking");

// Combine all the resolvers into root resolver
const rootResolver = {
  // Use spread operator to pull out all the functions
  ...userResolver,
  ...eventResolver,
  ...bookingResolver,
};

module.exports = rootResolver;
