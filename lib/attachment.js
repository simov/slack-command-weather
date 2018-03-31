
var icon = require('./icon')


module.exports = {
  ok: () => [{
    fallback: 'Weather Forecast',
    pretext: '> working ...',
    mrkdwn_in: ['pretext']
  }],

  help: () => [{
    fallback: 'Weather Forecast',
    text: '*/weather* _[location]_ - current weather forecast for location',
    mrkdwn_in: ['text']
  }],

  error: (message) => [{
    fallback: 'Weather Forecast',
    color: '#af1b0e',
    text: message,
    mrkdwn_in: ['text']
  }],

  item: (item, input) => [{
    fallback: 'Weather Forecast',
    color: '#75d6ff',

    author_name: input,
    author_link: `https://www.google.com/maps/place/${item.latitude},${item.longitude}`,
    author_icon: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/emoji-one/104'
      + `/${icon(item.currently.icon)}.png`,

    title: item.currently.temperature + ' градуса',
    // title_link: item.url,

    text: item.currently.summary,

    thumb_url: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/emoji-one/104'
      + `/${icon(item.currently.icon)}.png`,

    footer: `${item.timezone} (${item.offset})`,

    ts: Date.now() / 1000,

    mrkdwn_in: ['text']
  }]
}
