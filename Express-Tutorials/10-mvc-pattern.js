/* 
    In the `9-building-apis.js` file we saw the file gets cluttered because of too many routes. The solution is to use 
    Express router where we can group the routes together and set them up as separate controller. This means we will use
    MVC pattern

    1. We keep all the routes in a separate folder called `routes`
    2. We keep the routes with prefix `/api/people` in a separate file called `people.js` 
    3. We connect the `people.js` router with app using app.use() 
    4. We import the data files in the people.js and remove the import from current file
    5. In the people.js file remove the base route of `/api/people`

    Similarly, we can do this for other API's as well
*/

const express = require('express');
const people = require('./routes/people');
const auth = require('./routes/auth');
const app = express();

app.listen(3000, (req, res) => {
    console.log('server is listening at port 3000...');
})

app.use(express.static('./methods-public'));
app.use(express.urlencoded({ extended: false }));
// To send the data in json format we need to use another middleware called `json`. The data send from the javascript.html
// is in JSON format so to parse that we nee the express.json() middleware 
app.use(express.json());

app.use('/login', auth);
app.use('/api/people', people);

