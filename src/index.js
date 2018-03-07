import 'babel-polyfill';
const httpErrorHandler = require('./middlewares/httpErrorHandler');
const httpResponseHandler = require('./middlewares/httpResponseHandler');

export {
  httpErrorHandler,
  httpResponseHandler
};
