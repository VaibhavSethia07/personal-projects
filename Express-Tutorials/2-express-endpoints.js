const express = require('express');
// same as http.createServer((req,res)=>{})
const app = express();

app.listen(5000, () => {
    console.log('server is listening on 5000...');
})

app.get('/', (req, res) => {
    res.status(200).send("home page");
})

app.get('/about', (req, res) => {
    res.status(200).send("about page");
})

// all -> all verbs(get,put,post,delete) '*' -> all paths
// If the path matches any of the above paths then above endpoints are executed. But if the path doesn't match the above
// ones then this endpoint is executed
app.all('*', (req, res) => {
    res.status(404).send(`<h1>Oops!</h1> Page not found`);
})

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.listen