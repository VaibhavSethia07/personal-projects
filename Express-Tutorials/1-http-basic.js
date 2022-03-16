/* 
    We will be using Express for creating server instead of http. However, Express is built on top of 
    Node and http.

    Ports are the communication endpoints and http uses specific ports for communication
*/

const http = require('http');

/* We can pass the html through a file by reading it. We can use readFileSync in this case because we are not invoking the
   createServer function everytime. We require the file only when we instantiate the server.
   const homePage = readFileSync('./index.html');
   If we place the above statment in the createServer() then we need to use readFile
*/
const server = http.createServer((req, res) => {
    console.log('user has hit the server');
    /*
        In case of http server
        Here if we are using images/JavaScript/logos then they will not be handled and will go in else part and we will get 404
        So we have to explicitly reference them
    
        Outside createServer() method
         const homeStyles = readFileSync('./nav-bar/styles.css');
        Inside
           else if(url === './styles.cs's){
               res.writeHead(200, {'content-type':'text/css})
               res.write(homeStyles)
               res.end()
           } 

        So it is better to use Express.js
    */

    if (req.url === '/') {
        res.writeHead(200, 'Ok', { 'Content-Type': 'text/html' });
        res.write(`<h1>Home Page</h1>`);
    } else if (req.url === '/careers') {
        res.writeHead(201, 'Success', { 'Content-Type': 'text/plain' });
        res.write('Careers page');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Not Found');
    }
    res.end();
})

server.listen(3000);
