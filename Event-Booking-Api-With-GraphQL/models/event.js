// This file is a JavaScript model
const mongoose = require('mongoose');
// `Schema` is a constructor function
const Schema = mongoose.Schema;

/* The constructor function takes a JavaScript object that allows us to define a structure. This structure of event object
   will be used throughout the application
*/
const eventSchema = new Schema({
    // How are event looks like
    // title: String OR
    title: {
        type: String,
        // Matches the GraphQL schema, though not needed. It just maintains the consistency in code
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

// After creating the schema we create the model. This model is the blueprint of the objects we will be making
/* `model()` takes 2 arguments
    1: name of the model
    2: a pointer to the schema of the model

    We export it to use it in other files as well.
*/
module.exports = mongoose.model('Event', eventSchema);