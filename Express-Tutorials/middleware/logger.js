const express = require('express');

const logger1 = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toDateString();
    console.log(method, url, time);
    next();
}

const logger2 = (req, res, next) => {
    console.log('Logger 2 is the middleware');
    next();
}

module.exports = { logger1, logger2 };