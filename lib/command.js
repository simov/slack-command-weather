
var compose = require('request-compose')
var request = compose.client

var client = require('./client')
var attachment = require('./attachment')


var respond = ({auth, input}) => ({
  attachments:
    input.token !== auth.slack ? attachment.error('Invalid token!') :
    input.text === 'help' ? attachment.help() :
    attachment.ok()
})

var execute = async ({auth, input}) => {
  if (auth.slack !== input.token || !input.text || input.text === 'help') {
    return
  }
  try {
    await client({auth, input})
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

module.exports = {respond, execute}
