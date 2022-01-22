const express = require('express');
const app = express();

app.listen(3000, (req, res) => {
    console.log('server is listening 3000...');
})

// To load static assets
app.use(express.static('./methods-public'));

// Inorder to get the form data, we use `urlencoded` middleware. urlencoded middleware puts the form data into the request
// body
app.use(express.urlencoded({ extended: false }))

app.post('/login', (req, res) => {
    const { name } = req.body;
    if (name)
        return res.status(200).send(`Welcome ${name}`);
    return res.status(401).send("Please fill up the credentials");
})