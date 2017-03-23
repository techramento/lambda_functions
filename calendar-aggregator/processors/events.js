const DESCR_START_INDEX = 3
const DESCR_END_OFFSET_INDEX = 2

module.exports = function eventsProcessor (key) {
  return (calendar) =>
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
    )
}
