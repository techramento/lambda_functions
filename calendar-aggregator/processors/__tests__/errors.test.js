const errorsProcessor = require('../errors')
const MockErrors = require('../../__fixtures__/errors.json')

const MockCalendar = Object.freeze({})

describe('errors processor', () => {
  it('throws an error when the payload contains error data', () => {
    expect(() => {
      errorsProcessor({ error: MockErrors.apiError })
    }).toThrowError('mock error')

    try {
      errorsProcessor({ error: MockErrors.apiError })
    } catch (err) {
      expect(err.code).toBe(999)
      expect(err.errors[0].domain).toBe('usageLimits')
    }
  })

  it('does not throw an error when the payload contains no error data', () => {
    expect(() => {
      errorsProcessor(MockCalendar)
    }).not.toThrowError('mock error')
    expect(errorsProcessor(MockCalendar)).toBe(MockCalendar)
  })
})
