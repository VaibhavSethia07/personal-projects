const { buildSchema } = require("graphql");
/*  If we add the login functionality to our API, then `login()` is not a mutation because it is not going to change the
    data stored so we add it to the `RootQuery` section
*/
/*  For a user to login we need its email and password. And after the authentication we need to return some data which can
    be used by the API such as userId, JSON Web Token (JWT) and token expiration time */
module.exports = buildSchema(`
        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
        }
        
        type Booking {
            _id: ID!
            event: Event!
            user: User!
            createdAt: String!
            updatedAt: String!
        }

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            mobile: String!
            gender: String!
            age: Int!
            createdEvents: [Event!]!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
            mobile: String!
            gender: String!
            age: Int!
        }

        type RootQuery {
            events: [Event!]!
            users: [User!]!
            bookings: [Booking!]!
            login(email: String!,password: String!): AuthData!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
            bookEvent(eventId: ID, userId: ID): Booking
            cancelBooking(bookingId: ID): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);
