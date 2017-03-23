const calendar = require('../calendar')('APIKEY')
const MockResponses = require('../../__fixtures__/responses.json')
const nock = require('nock')

afterEach(() => nock.cleanAll())

describe('calendar requests', () => {
  it('fetches and processes a specific calendar', () => {
    nock('https://www.googleapis.com')
      .get(/\/calendar\/v3\/calendars\/[^/]+\/events/)
      .reply(200, JSON.stringify(MockResponses.ok))

    // TODO: https://facebook.github.io/jest/docs/expect.html#resolves
    return calendar('SacJS').then((okResponse) =>
      expect(okResponse).toMatchSnapshot())
  })

  it('processes calendar error responses', () => {
    nock('https://www.googleapis.com')
      .get(/\/calendar\/v3\/calendars\/[^/]+\/events/)
      .reply(200, JSON.stringify(MockResponses.error))

    const unexpectedResolve = jest.fn()

    // TODO: https://facebook.github.io/jest/docs/expect.html#rejects
    return calendar('SacJS')
      .then(unexpectedResolve)
      .then(
        (okResponse) => expect(unexpectedResolve).not.toHaveBeenCalled(),
        (errResponse) => expect(errResponse).toMatchSnapshot()
      )
  })
})
