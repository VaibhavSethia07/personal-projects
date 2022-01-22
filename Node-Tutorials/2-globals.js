// GLOBALS NO WINDOWS !!

// __dirname    -- path of current directory
// __filename   -- file name
// require      -- function to use modules (CommonJS)
// module       -- info about current module (file)
// process      -- info about the env where the program is being executed

console.log(__dirname);
console.log(__filename);
console.log(require);
console.log(module);
console.log(process);

setInterval(() => {
    console.log("Hello world!");
}, 1000)
