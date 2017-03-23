const flattenCalendars = require('../flattenCalendars')

describe('flattenCalendars processor', () => {
  it('flattens arrays', () => {
    expect(flattenCalendars([[1], [2]])).toMatchObject([1, 2])
  })
})
