const aggregator = require('./aggregator')

module.exports.calendars = (event, context, callback) => {
  aggregator(event, callback)
}
