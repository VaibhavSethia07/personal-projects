/*      Middleware (Important)
    Middlewares are the functions that execute during the request to the server. Each middleware has access to request and
    response object.
                    req => middleware => res
    Middlewares are everywhere in express. Infact, express apps are nothing but a set of middlewares.
*/

const express = require('express');
const app = express();

/*  If we have to perform a task in multiple functions then, it's best to make a separate function for it. But if we have
    to use request and response, we can use middleware

    middleware function takes request, response and next objects as parameters. In middleware after all the operations it 
    is must to pass on to the next middleware by using next();
*/
const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toDateString();
    console.log(method, url, time);
    // res.send('Testing');
    next();
}
app.listen(3000, (req, res) => {
    console.log('server is listening at port 3000...');
})

app.get('/', logger, (req, res) => {
    res.send("Home");
})

app.get('/about', logger, (req, res) => {
    res.send("About");
})