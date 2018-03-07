'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpResponseHandler = exports.httpErrorHandler = undefined;

require('babel-polyfill');

var _httpErrorHandler = require('./middlewares/httpErrorHandler');

var _httpErrorHandler2 = _interopRequireDefault(_httpErrorHandler);

var _httpResponseHandler = require('./middlewares/httpResponseHandler');

var _httpResponseHandler2 = _interopRequireDefault(_httpResponseHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.httpErrorHandler = _httpErrorHandler2.default;
exports.httpResponseHandler = _httpResponseHandler2.default;