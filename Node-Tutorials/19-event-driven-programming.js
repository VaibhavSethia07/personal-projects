/* 
    Event driven programming- It is a style of prgramming in which the flow of the program is determined by the events
    that occur as the program executes
    Eg- clicking a button, hovering over text
*/

const EventEmitter = require('events');
const customEmitter = new EventEmitter();

customEmitter.on('foo', () => {
    console.log("Data received!");
})

customEmitter.on('foo', (name, id) => {
    console.log(`Data received with ${name} and id:${id}`)
})

customEmitter.on('bar', () => {
    console.log("Oops!");
})


// The order of on() and emit() function matters. So we first listen for the event using on() and the emit() response
customEmitter.emit('bar');
customEmitter.emit('foo', 'Vaibhav', 07);

// Server using Events
const http = require('http');
const server = http.createServer();

server.on('connection', (req, res) => {
    console.log('Welcome!');
})

server.listen(3000);
console.log("Hi");
server.close();