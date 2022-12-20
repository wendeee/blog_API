//calculate reading time for an article based on the number of words
exports.readTime = (body) => {
  const wpm = 225;
  const numOfWords = body.trim().split(/\s+/).length;
  const readingTime = Math.ceil(numOfWords / wpm);
  return readingTime;
};
