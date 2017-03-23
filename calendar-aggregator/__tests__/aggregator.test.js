const aggregator = require('../aggregator')
const event = require('../event.json')
const MockResponses = require('../__fixtures__/responses.json')
const nock = require('nock')

describe('aggregator', () => {
  it('fetches and processes and Google Calendars', () => {
    nock('https://www.googleapis.com')
      .get(/\/calendar\/v3\/calendars\/[^/]+\/events/)
      .reply(200, JSON.stringify(MockResponses.ok))
      .get(/\/calendar\/v3\/calendars\/[^/]+\/events/)
      .reply(200, JSON.stringify(MockResponses.ok))
      .get(/\/calendar\/v3\/calendars\/[^/]+\/events/)
      .reply(200, JSON.stringify(MockResponses.ok))

    // TODO: https://facebook.github.io/jest/docs/expect.html#resolves
    return aggregator(event, (err, response) => {
      expect(err).toBeNull()
      expect(response).toMatchSnapshot()
    })
  })
})
