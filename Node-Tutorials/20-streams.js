/* Streams are used to read/write sequentially. Eg- Continuous data, big files
    There are 4 types of streams
    1. Readable- Used to write data sequentially
    2. Writable- Used to write data sequentially
    3. Duplex- Used to read and write the data sequentially
    4. Transform- Used to modify data when writing or reading

    Streams extend EventEmmiter class

    Why do we need Streams?
    Till now we had been using sync/async methods to read/write large files and storing them in a variable. But storing large
    file in a variable is not possible. In these cases Streams come handy.
*/

const { createReadStream } = require('fs');
const { Stream } = require('stream');

// Here we are reading in chunks instead of reading entire file
const stream = createReadStream('./content/big-file.txt', 'utf-8');

stream.on('data', (result) => {
    console.log(result);
})

// Default size of chunk is 64kB
// Last Buffer - remainder
// highWaterMark - controls the size of chunk
// const stream = createReadStream('./content/big-file.txt', {highWaterMark: 90000})
// const stream = createReadStream('./content/big-file.txt', {encoding: 'utf8'})

// Error in file path
const stream = createReadStream('../content/big-file.txt', 'utf-8');
stream.on('error', (err) => {
    // Displays the error as text
    console.log(err);
})
