const { req, res } = require('express');
exports.readingTime = (body) => {
    // const body = req.body;
    const wpm = 225;
    const numOfWords = body.trim().split(/\s+/).length;
    const readingTime =  Math.ceil(numOfWords / wpm)
    return readingTime;
}