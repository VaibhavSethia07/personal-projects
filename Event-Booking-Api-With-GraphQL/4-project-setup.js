/*
    Install `express` framework 
--> npm i express

    Install `body-parser` to extract JSON fron incoming request
--> npm i body-parser

    To use GraphQL we need to install some packages. GraphQL has rules that define a query language. This query language
    sent by the client in the body of the POST request to the backend. The backend understands and parses the queries and
    deliever the data back to frontend. To parse the queries we need 2 things
        1. Package that can understand the queries
        2. We need to define which kind of queries we can handle

    1. For parsing and registering the schema, and matching the schema to the resolver, we use packages
    2. For writing the schema, we have to that

    We install 2 packages
    1.  `graphql` package- It allows us to setup the schema according to GraphQL rules and convert it to JavaScript
        objects

    2.  `express-graphql` package- It can be used as a middleware in Express-Node.js applications. It allows us to point at
        the schema and resolvers, route request to the parser, handle them according to schema and forward them to right
        resolver
*/
// Using express package
const express = require('express');
const bodyParser = require('body-parser');
// Executing express function
const app = express();

// Parse incoming JSON body
app.use(bodyParser.json())

app.listen(3000, () => {
    console.log('🚀 Server listening at port 3000...');
})
