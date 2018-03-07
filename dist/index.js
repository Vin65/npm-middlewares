'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpResponseHandler = exports.httpErrorHandler = undefined;

require('babel-polyfill');

var httpErrorHandler = require('./middlewares/httpErrorHandler');
var httpResponseHandler = require('./middlewares/httpResponseHandler');

exports.httpErrorHandler = httpErrorHandler;
exports.httpResponseHandler = httpResponseHandler;