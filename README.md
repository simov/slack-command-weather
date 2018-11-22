
# slack-command-weather

> Weather Forecast /slash Command for Slack

## middleware

```js
var express = require('express')
var weather = require('slack-command-weather')
var auth = {google: 'API key', darksky: 'API key', slack: 'hook token'}

express()
  .use(weather(auth))
  .listen(3000)
```

## api

```js
var express = require('express')
var parser = require('body-parser')
var weather = require('slack-command-weather')
var auth = {google: 'API key', darksky: 'API key', slack: 'hook token'}

express()
  .use(parser.urlencoded({extended: true}))
  .use((req, res) => {
    var input = req.body
    res.json(weather.respond({auth, input}))
    weather.query({auth, input}).catch(console.error)
  })
  .listen(3000)
```

## command

Option                | Value
:--                   | :--
Command               | `/weather`
Request URL           | `https://website.com/weather`
Short Description     | `Weather Forecast`
Usage Hint            | `[location]`

## example

Command               | Description
:--                   | :--
`/weather tokyo`      | current weather in Tokyo
`/weather help`       | help message


  [geoip]: https://developers.google.com/maps/documentation/geocoding/start
  [darksky]: https://darksky.net/dev/
