/*
    We will be using `nodemon` as our dev-dependency
    The nodemon watches our files and restart the app for us. So in this way, each time we don't have to type `node filename.js`
    
    To download a package as dev-dependency use the command given below-
    npm i <packagename> -D
        Or
    npm i <packagename> --save-dev
    Eg- npm i nodemon -D

    Install nodemom globally so that we can use it in other projects as well

    Why we need nodemon as dev-dependency?
    --> We do not need nodemon in production but when we are developing we want to restart our server autmatically.
    We can even install nodemon as dependency but it makes more sense to install it as dev-dependency.

    How to use nodemon?
    --> See the scripts-object.js

    
*/