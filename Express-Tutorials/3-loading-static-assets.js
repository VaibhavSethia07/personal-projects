const express = require('express');
const path = require('path');
const app = express();

app.listen(3000, (req, res) => {
    console.log('server is listening on port 3000...');
})

/*  app.use() sets up static and middleware
    Write the app.use() function before all the endpoints
    It is convention to put static assets in public folder. Static asset means server can't change it
    Express sets up the paths, mine types for all the static assets
    Eg of static file- Image file, JavaScript file and a CSS file
*/

// Industry convention to name folder with static files as public
app.use(express.static('./public'))

// Even index.html is a static asset. We can dump it in the public folder and no need to write the get endpoint. The html
// page will still be served. This method is to be used for simple websites
// So there are 2 methods
// 1. Adding static assets to public folder
// 2. Server-Side Rendering

/*Important: To load html page at an endpoint */
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
})

// This endpoint should be written at the end as JavaScript reads line by line
app.all('*', (req, res) => {
    res.status(404).send('Page not found');
})
