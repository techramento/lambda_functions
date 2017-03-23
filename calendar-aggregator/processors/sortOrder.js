module.exports = function sortOrder (events) {
  return events.slice().sort((eventA, eventB) => {
    if (eventA.start.dateTime < eventB.start.dateTime) {
      return -1
    }
    if (eventA.start.dateTime > eventB.start.dateTime) {
      return 1
    }
    return 0
  })
}
