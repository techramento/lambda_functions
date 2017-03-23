const CALENDAR_IDS = require('./calendars.json')
const calendarRequest = require('./requests/calendar')
const dotenv = require('dotenv')
const errorResponse = require('./responses/error')
const flattenCalendars = require('./processors/flattenCalendars')
const sortOrderProcessor = require('./processors/sortOrder')
const successResponse = require('./responses/success')

dotenv.load()

module.exports = (input, callback) =>
  Promise.all(
    Object.keys(CALENDAR_IDS).map(calendarRequest(process.env.GOOGLE_API_KEY))
  )
    .then(flattenCalendars)
    .then(sortOrderProcessor)
    .then(successResponse(input, callback))
    .catch(errorResponse(input, callback))
