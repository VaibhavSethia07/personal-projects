const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { transformEvent, allEvents } = require("./merge");

module.exports = {
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
            return transformEvent(result);
          });
      })
      .catch((err) => {
        throw err;
      });
  },
};
