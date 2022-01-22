// npm - global command, comes with node
// npm --version

// npm call reusable code, a package.
// a package is a folder that essentially contains a JavaScript code
// packages can also be referred as modules/ dependencies
// npm is the largest hub of packages

// local dependency - use it only in this particular project (mostly used)
// npm i <packagename>

// global dependency - use it in any project
// npm install -g <packagename>
// sudo npm install -g <packagename> (mac);

// packages are stored a dependencies in package.json

// To create package.json use npm init --y

// Example
// npm i bootstrap
// const bootstrap = require('bootstrap');

// When pushing code to GitHub, don't push node_modules because it will be quite big in size. Instead ignore it in .gitignore file
// Eg /node_modules
// If other person downloads the source code from the GitHub repository, then he needs to run `npm install` command. npm will see
// the dependencies mentioned in the package.json file and download them

// To uninstall a package
// --> npm uninstall <packagename>
