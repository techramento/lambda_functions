const eventsProcessor = require('../events')('MyMeetup')

const description = `The Name of the Meetup
Thursday, January 01 at 7:00 PM

EVENT DESCRIPTION...

https://example.org/`

const MockCalendar = {
  items: [
    {
      description
    }
  ]
}

describe('events processor', () => {
  it('transforms the data of each event item', () => {
    expect(eventsProcessor(MockCalendar)).toMatchSnapshot()
  })
})
