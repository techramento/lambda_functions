module.exports = function successResponse (input, callback) {
  return (data) => {
    const response = {
      body: JSON.stringify({
        data,
        input
      }),
      statusCode: 200
    }
    try {
      callback(null, response)
    } catch (err) {
      console.error(err)
    }
  }
}
