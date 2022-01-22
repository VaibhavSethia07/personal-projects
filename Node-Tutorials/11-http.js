const http = require('http');

// Run the server and hit localhost:1234
const server = http.createServer((req, res) => {
    // Default url for homepage
    if (req.url === '/')
        res.end("You're at homepage");
    else if (req.url === '/about')
        res.end("You're at about us page");
    else if (req.url === '/error') {
        res.end(`
            <h1>Oops!</h1>
            We can't find page you're looking for
            <br>
            <a href='/'>Back Home</a> 
        `)
    }
    console.log('Server is running!');
})

server.listen(1234);