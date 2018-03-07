# npm-middlewares
A collection of middyJS custom middlewares for lambda functions

# Installation
* `npm install --save npm-middlewares`

# Middlewares documentation

## Available middlewares

 - [httpErrorHandler](#httperrorhandler)
 - [httpResponseHandler](#httpresponsehandler)

## [httpErrorHandler](/src/middlewares/httpErrorHandler.js)

Automatically handles uncaught errors that are created with
[`http-errors`](https://npm.im/http-errors) and creates a proper HTTP response
for them (using the message and the status code provided by the error object).

Supports [`ajv`](https://github.com/epoberezkin/ajv) validation errors by
looking for errors with the error message: `Event object failed validation`.

Will call the function `ajv.errorsText` passing in the `error.details`.

It should be set as the last error handler.


### Sample usage

```javascript
const middy = require('middy')
const { httpErrorHandler } = require('npm-middlewares')

const handler = middy((event, context, cb) => {
  throw new createError.UnprocessableEntity()
})

handler
  .use(httpErrorHandler())

// when Lambda runs the handler...
handler({}, {}, (_, response) => {
  expect(response).toEqual({
    statusCode: 422,
    body: '{"errorMessage":"Unprocessable Entity"}'
  })
})
```

## [httpResponseHandler](/src/middlewares/httpErrorHandler.js)

Automatically handles returned objects from the `callback` or returned when using an `async` function and creates a proper HTTP response
for them (using the object as the response body and a 200 status code).


### Sample usage

```javascript
const middy = require('middy')
const { httpResponseHandler } = require('npm-middlewares')

// When using an async/await syntax

const handler = middy(async(event, context) => {
  return {
    foo: "bar"
  }
})

// Or when using a non async function, use the callback

const handler = middy((event, context, callback) => {
  return callback(null, {
    foo: "bar"
  });
})

handler
  .use(httpResponseHandler())

// when Lambda runs the handler...
handler({}, {}, (_, response) => {
  expect(response).toEqual({
    statusCode: 200,
    body: '{"foo":"bar"}'
  })
})
```