
var compose = require('request-compose')
var request = compose.client
var attachment = require('./lib/attachment')


var respond = ({auth, input}) => ({
  attachments:
    input.token !== auth.slack ? attachment.error('Invalid token!') :
    input.text === 'help' ? attachment.help() :
    attachment.ok()
})


var query = ({auth, input}) => compose(

  _ => request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: {
      key: auth.google,
      address: input.text,
    },
  }),

  ({body: {results: [{geometry: {location}}]}}) => request({
    url: `https://api.darksky.net/forecast/${auth.darksky}` +
      `/${location.lat},${location.lng}`,
    qs: {
      lang: 'bg',
      units: 'si',
      exclude: 'minutely,hourly,daily,alerts,flags',
    },
  }),

  ({body}) => request({
    method: 'POST',
    url: input.response_url,
    json: {attachments: attachment.item(body, input.text)},
  }),

)()


module.exports = {
  respond,
  query: async ({auth, input}) => {
    if (auth.slack !== input.token || !input.text || input.text === 'help') {
      return
    }
    try {
      await query({auth, input})
    }
    catch (err) {
      request({
        method: 'POST',
        url: input.response_url,
        json: {attachments: attachment.error('Internal error!')}
      })
      throw err
    }
  }
}
