const CALENDAR_IDS = require('../calendars.json')
const errorsProcessor = require('../processors/errors')
const eventsProcessor = require('../processors/events')
const fetch = require('isomorphic-fetch')
const template = require('url-template')

const URL = template.parse(
  'https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events{?key}'
)

module.exports = function calendarRequest (key) {
  return (calendarName) => {
    const calendarId = CALENDAR_IDS[calendarName]
    return fetch(
      URL.expand({
        calendarId,
        key
      })
    )
      .then((response) => response.json())
      .then(errorsProcessor)
      .then(eventsProcessor(calendarName))
  }
}
