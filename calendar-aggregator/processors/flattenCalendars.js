module.exports = function flattenCalendars (calendars) {
  return calendars.reduce((set, data) => set.concat(data), [])
}
