const successResponse = require('../success')

const MockData = [
  {
    item: 'mock'
  }
]
const MockInput = Object.freeze({})

describe('success responses', () => {
  it('calls the callback with the calendar data', () => {
    successResponse(MockInput, (err, response) => {
      expect(err).toBeNull()
      expect(response).toMatchSnapshot()
    })(MockData)
  })

  it('does not crash if the callback itself throws', () => {
    const exception = new Error('MOCK EXCEPTION')
    const origConsole = console.error
    console.error = jest.fn()
    successResponse(MockInput, () => {
      throw exception
    })(MockData)
    expect(console.error).toHaveBeenCalledWith(exception)
    console.error = origConsole
  })
})
