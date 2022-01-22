// Destructuring
const { readFileSync, writeFileSync } = require('fs');
//or
// const fs=require('fs');
// const readFileSync=fs.readFileSync;
// const writeFileSync=fs.writeFileSync;
console.log("Start");
const first = readFileSync('./content/first.txt', 'utf-8');
const second = readFileSync('./content/second.txt', 'utf-8');

// If the file exists, it will be overridden. Otherwise it will be  created.
writeFileSync('./content/result-sync.txt', `Here is the result: ${first}, ${second}`);

// For appending a file
writeFileSync('./content/result-sync.txt', `This time I'm appending the data.`, { flag: 'a' })
console.log("Done with this task.")
console.log("Starting the next one");