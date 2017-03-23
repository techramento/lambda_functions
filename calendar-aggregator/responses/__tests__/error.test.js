const errorResponse = require('../error')
const MockErrors = require('../../__fixtures__/errors.json')
const MockInput = Object.freeze({})

describe('error responses', () => {
  it('calls the callback with an error object', () => {
    errorResponse(MockInput, (error, response) => {
      expect(error).toMatchSnapshot()
      expect(response).toMatchSnapshot()
    })(MockErrors.apiError)
  })

  it('provides a default error code when one is not provided', () => {
    errorResponse(MockInput, (error, response) => {
      expect(error).toMatchSnapshot()
      expect(response).toMatchSnapshot()
    })(MockErrors.exception)
  })

  it('does not crash if the callback itself throws', () => {
    const exception = new Error('MOCK EXCEPTION')
    const origConsole = console.error
    console.error = jest.fn()
    errorResponse(MockInput, () => {
      throw exception
    })(MockErrors.apiError)
    expect(console.error).toHaveBeenCalledWith(exception)
    console.error = origConsole
  })
})
