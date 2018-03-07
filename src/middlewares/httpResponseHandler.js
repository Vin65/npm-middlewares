module.exports = () => ({
  after: (handler, next) => {
    handler.response = {
      statusCode: 200,
      body: JSON.stringify(handler.response)
    };

    return next();
  }
});
