"use strict";

module.exports = function () {
  return {
    after: function after(handler, next) {
      handler.response = {
        statusCode: 200,
        body: JSON.stringify(handler.response)
      };

      return next();
    }
  };
};