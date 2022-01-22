const authorize = (req, res, next) => {
    const { user } = req.query;
    if (user) {
        req.user = user;
        next();
    } else {
        res.send("Not Authorized");
    }
}

module.exports = authorize;