const parser = require('parse-address')

const DESCR_START_INDEX = 3
const DESCR_END_OFFSET_INDEX = 2

const MeetupLocationAddress = /([^(]+) \(([^)]+)/

function extractLocation (event) {
  if (!event.location) {
    return null
  }
  const location = event.location || ''
  const locationInfo = (location.match(MeetupLocationAddress) || [])
    .slice(1, 3)
  const address = parser.parseLocation(locationInfo[1] || '') || {}
  return Object.assign(address, {
    name: locationInfo[0] || null
  })
}

function extractMeetup (calendarName, event) {
  const details = event.description.split('\n')
  const description = details
    .slice(DESCR_START_INDEX, details.length - DESCR_END_OFFSET_INDEX)
    .join('\n')
  return {
    description,
    group: details[0],
    short_name: calendarName,
    url: details[details.length - 1]
  }
}

module.exports = function eventsProcessor (calendarName) {
  return (calendar) =>
    calendar.items.reduce(
      (set, event) => {
        set.push(
          Object.assign({}, event, {
            location: extractLocation(event),
            meetup: extractMeetup(calendarName, event)
          })
        )
        return set
      },
      []
    )
}
