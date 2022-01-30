const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  /*  We want to have a look at header of the incoming request, for this we can use the `get('key')` of the request. To get
    the authorization field we use the following syntax  */
  const authHeader = req.get("Authorization");
  /*  If there is no auth field, then this user is not authenticated. But this does not mean the user will not have access
    anything. We should block access to some of the resolver functions but not to all of them. We can let the request
    continue its journey throughout the API but we can attach some information with the request so other resolvers can
    check `is the user authenticated`

    To do this we add another field to our request (e.g isAuth). We can use any name that doesn't exist in the request
    object already
*/
  if (!authHeader) {
    req.isAuth = false;
    // We move on to next function if we do not have authentication header
    return next();
  }
  /*  We need to get the token, for this we split the authorization header in 2 parts
        1st part is Bearer
        2nd part is token
        Eg:Authorization: Bearer kfvhebk
    */
  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  // Now we have the token which we need to verify.To do this we use jsonwebtoken package.We verify using secret key
  /* The verification process could actually fail. So we put it in try-catch block */
  let decodedToken;
  try {
    // We store the decoded token
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;

  // We look into the decoded token, so that we can use the data we put in while creating the user
  req.userId = decodedToken.userId;
  next();
};
/*  How to we use this middleware to protect our API. In case of REST API, we used to pass the middleware in the function
    arguments. But in case of GraphQL we have only 1 endpoint `/graphql`. If we add the middleware in the `/graphql` 
    endpoint then the entire API is locked.
    
    To solve this problem we use app.use() and pass the middleware. Since our middleware is not throwing error it is just
    setting some properties we can all it when we run the application.
    To do this we
*/
