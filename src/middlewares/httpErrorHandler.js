import Ajv from 'ajv';

const {
  HttpError
} = require('http-errors');

const ajv = new Ajv();

module.exports = () => ({
  onError: (handler, next) => {
    if (handler.error instanceof HttpError) {
      let errorMessage = handler.error.message;
      if (handler.error.message === 'Event object failed validation') {
        errorMessage = ajv.errorsText(handler.error.details);
      }
      handler.response = {
        statusCode: handler.error.statusCode,
        body: JSON.stringify({
          errorMessage
        })
      };
      return next();
    }

    return next(handler.error);
  }
});
