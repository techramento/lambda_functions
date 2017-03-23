const handler = require('../handler')

jest.mock('../aggregator', () => (event, callback) => callback())

describe('handlers', () =>
  describe('calendars', () => {
    it('calls the calendar aggregator', () => {
      const callback = jest.fn()
      handler.calendars(null, null, callback)
      expect(callback).toHaveBeenCalled()
    })
  }))
