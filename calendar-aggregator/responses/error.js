const ErrorProps = ['message', 'arguments', 'type', 'name']

module.exports = function errorResponse (input, callback) {
  return (error) => {
    const response = {
      body: JSON.stringify({
        details: JSON.stringify(error.errors),
        error: JSON.parse(JSON.stringify(error, ErrorProps)),
        input,
        message: `${error.name}: ${error.message}`
      }),
      statusCode: error.code || 500
    }
    try {
      callback(error, response)
    } catch (err) {
      console.error(err)
    }
  }
}
