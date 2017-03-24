const eventsProcessor = require('../events')('MyMeetup')
const MockEvents = require('../../__fixtures__/events.json')

const MockCalendar = {
  items: MockEvents
}

describe('events processor', () => {
  it('transforms the data of each event item', () => {
    expect(eventsProcessor(MockCalendar)).toMatchSnapshot()
  })
})
