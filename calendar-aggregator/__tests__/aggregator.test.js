const aggregator = require('../aggregator')
const event = require('../event.json')

test('calendar aggregation', (done) =>
  aggregator(event, (err, response) => {
    expect(err).toBeNull()
    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    expect(body.input).not.toBeNull()
    expect(body.data.length).toBeGreaterThan(0)
    expect(body.data[0].meetup).not.toBeNull()
    done()
  }))
