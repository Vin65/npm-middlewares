'use strict';

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('http-errors'),
    HttpError = _require.HttpError;

var ajv = new _ajv2.default();

module.exports = function () {
  return {
    onError: function onError(handler, next) {
      if (handler.error instanceof HttpError) {
        var errorMessage = handler.error.message;
        if (handler.error.message === 'Event object failed validation') {
          errorMessage = ajv.errorsText(handler.error.details);
        }
        handler.response = {
          statusCode: handler.error.statusCode,
          body: JSON.stringify({
            errorMessage: errorMessage
          })
        };
        return next();
      }

      return next(handler.error);
    }
  };
};