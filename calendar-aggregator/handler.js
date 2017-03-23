const aggregator = require('./aggregator')
const dotenv = require('dotenv')

dotenv.load()

module.exports.calendars = (event, context, callback) =>
  aggregator(event, callback)
