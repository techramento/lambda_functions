'use strict'

module.exports.calendars = (event, context, callback) => {
  const response = {
    body: JSON.stringify({
      input: event,
      message: 'Go Serverless v1.0! Your function executed successfully!'
    }),
    statusCode: 200
  }

  callback(null, response)
}
