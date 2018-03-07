'use strict';

import {
  httpErrorHandler
} from './../../src/index';

const middy = require('middy');

const CreateError = require('http-errors');

const expect = require('chai').expect;

describe('httpErrorHandler', function() {
  describe('#onError', function() {
    context('http-error is thrown', function() {
      it('catches the error and returns a valid http response for the lambda-proxy integration', function(done) {
        const handler = middy((event, context, callback) => {
          throw new CreateError.BadRequest('Invalid payload.');
        });

        handler.use(httpErrorHandler());

        handler({}, {}, (_, response) => {
          expect(response.statusCode).to.eq(400);
          expect(JSON.parse(response.body).errorMessage).to.eq('Invalid payload.');
          done();
        });
      });
    });

    context('regular error is thrown', function() {
      it('tests', function(done) {
        const expectedError = new Error('Invalid payload.');

        const handler = middy((event, context, callback) => {
          throw expectedError;
        });

        handler.use(httpErrorHandler());

        handler({}, {}, (error, response) => {
          expect(error).to.eql(expectedError);
          done();
        });
      });
    });
  });
});
