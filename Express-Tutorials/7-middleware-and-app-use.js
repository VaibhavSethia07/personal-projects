const express = require('express');
const { logger1, logger2 } = require('./middleware/logger');
const authorize = require('./middleware/authorize');
const app = express();

app.listen(3000, (req, res) => {
    console.log('server is listening at port 3000...');
})

/* It is a good practice to keep the middleware in separate file 
    app.get('/', logger, (req, res) => {
        res.send("Home");
    })

    If we want to pass middleware to many functions then use the api app.use() 

    All the endpoints after the app.use() will have the middleware passed by express

    We can even pass multiple middlewars in app.use() as an array of middlewares g: app.use([logger1,logger2])

    express.static('./public) is also a middleware
*/
app.use(logger1);

app.get('/', (req, res) => {
    res.send("Home");
})

app.get('/about', (req, res) => {
    res.send("About");
})

// In app.use() we can even specify the path and the middleware is executed when the base of the requested path matches 
// path
app.use('/api/v1', logger2);

app.get('/api/v1/products', (req, res) => {
    res.send("Products");
})

app.get('/careers', authorize, (req, res) => {
    res.send(`${req.user} Careers`);
})

app.get('/info', (req, res) => {
    res.send("Info");
})