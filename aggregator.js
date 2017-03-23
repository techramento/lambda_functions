const dotenv = require('dotenv')
const fetch = require('isomorphic-fetch')

dotenv.load()

// eslint-disable-next-line max-len
const CALENDAR_URL = `https://www.googleapis.com/calendar/v3/calendars/%%CALENDAR_ID%%/events?key=${process.env.GOOGLE_API_KEY}`
const DESCR_START_INDEX = 3
const DESCR_END_OFFSET_INDEX = 2

const CALENDAR_IDS = {
  Code4Sac: '340qq3ln9efvq46jtqivlrqi6e64fu4d@import.calendar.google.com',
  SacJS: 'vvn2oatkhmhc8rdf81r9irtiprdigslv@import.calendar.google.com',
  SacRuby: 'br9glo96n30cb7bkhbmmuhtn27kfv92l@import.calendar.google.com'
}

function getCalendar (key, id) {
  return fetch(CALENDAR_URL.replace('%%CALENDAR_ID%%', id))
    .then((response) => response.json())
    .then((calendar) => {
      if (calendar.error) {
        const err = new Error(calendar.error.message)
        err.code = calendar.error.code
        err.errors = calendar.error.errors
        throw err
      }
      return calendar
    })
    .then((calendar) =>
      calendar.items.reduce(
        (set, event) => {
          const details = event.description.split('\n')
          const description = details
            .slice(DESCR_START_INDEX, details.length - DESCR_END_OFFSET_INDEX)
            .join('\n')
          set.push(
            Object.assign({}, event, {
              meetup: {
                description,
                group: details[0],
                short_name: key,
                url: details[details.length - 1]
              }
            })
          )
          return set
        },
        []
      ))
}

module.exports = (event, callback) =>
  Promise.all(
    Object.keys(CALENDAR_IDS).map((key) => getCalendar(key, CALENDAR_IDS[key]))
  )
    .then((calendars) => {
      const response = {
        body: JSON.stringify({
          data: calendars.reduce((set, events) => set.concat(events), []),
          input: event
        }),
        statusCode: 200
      }
      try {
        callback(null, response)
      } catch (err) {
        console.error(err)
      }
    })
    .catch((err) => {
      callback(err, {
        body: JSON.stringify({
          details: JSON.stringify(err.errors),
          error: JSON.parse(
            JSON.stringify(err, ['message', 'arguments', 'type', 'name'])
          ),
          input: event,
          message: `${err.name}: ${err.message}`
        }),
        statusCode: err.code || 500
      })
    })
