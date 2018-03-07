'use strict';

import {
  httpResponseHandler
} from './../../src/index';

const middy = require('middy');

const expect = require('chai').expect;

describe('httpResponseHandler', function() {
  describe('#after', function() {
    context('object is returned with callback', function() {
      it('stringifies the object returned and returns a valid http response for lambda-proxy integration', function(done) {
        const handler = middy((event, context, callback) => {
          return callback(null, {
            foo: 'bar'
          });
        });

        handler.use(httpResponseHandler());

        handler({}, {}, (_, response) => {
          expect(response.statusCode).to.eq(200);
          expect(JSON.parse(response.body).foo).to.eq('bar');
          done();
        });
      });
    });

    context('object is returned async', function() {
      it('stringifies the object returned and returns a valid http response for lambda-proxy integration', function(done) {
        const handler = middy(async(event, context) => {
          return {
            foo: 'bar'
          };
        });

        handler.use(httpResponseHandler());

        handler({}, {}, (_, response) => {
          expect(response.statusCode).to.eq(200);
          expect(JSON.parse(response.body).foo).to.eq('bar');
          done();
        });
      });
    });
  });
});
