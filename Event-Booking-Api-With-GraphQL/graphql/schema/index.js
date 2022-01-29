const { buildSchema } = require("graphql");
/* On the Mongoose model's side, we have an user who creates an event and for every user we have all the events
created by them.*/
module.exports = buildSchema(`
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
