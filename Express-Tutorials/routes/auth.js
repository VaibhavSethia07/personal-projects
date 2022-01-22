const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { name } = req.body;
    console.log(name);
    if (name)
        return res.status(200).send(`Welcome ${name}`);
    return res.status(401).send("Please fill up the credentials");
})

module.exports = router;