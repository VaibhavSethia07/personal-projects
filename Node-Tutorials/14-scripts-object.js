/* 
    In the scripts object we set up the commands
    We have a property called `start`, and we set the value as the command to run a file
    Eg
    scripts {
        "start": "node app.js"
    }

    Or

    scripts {
        "start": "nodemon app.js"
    }

    Terminal
    --> node run start (Sometimes node start also works)

    For nodemon
    scripts {
        "dev": "nodemon app.js"
    }

    Terminal
    --> node run dev

    The benefit of using nodemon is that after every change we don't have to run the file manually.
    `nodemon` does it automatically for us.

*/

console.log('App has started!');

