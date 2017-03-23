const MockEvents = require('../../__fixtures__/events.json')
const sortOrder = require('../sortOrder')

describe('sortOrder processor', () => {
  it('sorts the events by their start date', () => {
    expect(sortOrder(MockEvents)).toMatchSnapshot()
  })
})
