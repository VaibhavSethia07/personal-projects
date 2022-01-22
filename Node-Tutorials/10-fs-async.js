// For async js we use readFile and writeFile
const { readFile, writeFile } = require('fs');

console.log("Start");
readFile('./content/first.txt', 'utf8', (err, result) => {
    if (err) {
        console.log(err);
        return;
    }

    const first = result;
    readFile('./content/second.txt', 'utf8', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("Done with this task");
        const second = result;
        writeFile('./content/result-async.txt', `Async result is: ${first} ${second}`, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
        })

    })
})
console.log("Starting the next one");