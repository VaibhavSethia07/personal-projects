// System Modules
// os
// path
// fs
// http

const os = require("os");

console.log(`System's uptime: ${os.uptime()} seconds`);
console.log(os.userInfo());
console.log(os.version());

const currentOS = {
    name: os.type(),
    version: os.version(),
    fremem: os.freemem(),
    totalmem: os.totalmem()
};

console.log(currentOS);