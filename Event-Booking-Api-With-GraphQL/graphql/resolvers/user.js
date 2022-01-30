const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { transformEvent, allEvents } = require("./merge");

module.exports = {
  // We can use `args` way as well
  login: async ({ email, password }) => {
    try {
      // We first check if the user with the given email exists in the database or not
      const user = await User.findOne({ email: email });
      // We can give a general error that `Credentials are incorrect` without giving the hint where the mistake is. This
      // can be done from security point of view
      if (!user) return new Error("Email doesn't exist!");

      const isValidated = await bcrypt.compare(password, user.password);
      if (!isValidated) return new Error("Password is wrong!");

      // To create the token we need to install the package `jsonwebtoken`
      // -> npm install jsonwebtoken
      /* The `sign()` takes 3 parameters
         1 object-> We specify the data that we want to store in the token
         2 secret string-> This string is used for making the hash value of token. It should not be disclosed
         3 token expiration time-> It can be in ms, s or hrs 
         The `sign()` is a synchronous function so there is no need for await
      */
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return { userId: user.id, token: token, tokenExpiration: 1 };
    } catch (error) {
      throw error;
    }
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
            return transformEvent(result);
          });
      })
      .catch((err) => {
        throw err;
      });
  },
};
