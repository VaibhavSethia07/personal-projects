// CommonJS, every file is a module (By default)
// Modules - Encapsulated Code (only share minimum) 

const names = require("./4-names");
const sayHi = require("./5-utils");
const altFlavor = require("./6-alternative-flavor");

sayHi(names.susane);
sayHi(names.james);
sayHi(names.peter);
console.log(`Items: ${altFlavor.items} User: ${altFlavor.user.firstName}`);
