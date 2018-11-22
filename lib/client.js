
var compose = require('request-compose')
var request = compose.client
var attachment = require('./attachment')


module.exports = ({auth, input}) => compose(

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
