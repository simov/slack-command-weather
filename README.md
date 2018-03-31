
# slack-command-weather

> Weather Forecast /slash Command for Slack

## server

```js
var express = require('express')
var parser = require('body-parser')

var weather = require('slack-command-weather')
var path = require('path')
var auth = require(path.resolve(process.cwd(), process.argv[2]))


express()
  .use(parser.urlencoded({extended: true}))
  .use(parser.json())
  .use('/weather', (req, res) => {
    var input = req.body
    res.json(weather.respond({auth, input}))
    weather.query({auth, input}).catch(console.error)
  })
  .listen(3000)
```

## auth

```json
{
  "google": "API key",
  "darksky": "API key",
  "slack": "hook token"
}
```

## script

```bash
node server.js ~/path/to/auth.json
```

## command

Option                | Value
:--                   | :--
Command               | `/weather`
Request URL           | `https://website.com/weather`
Short Description     | `Weather Forecast`
Usage Hing            | `[location]`

## example

Command               | Description
:--                   | :--
`/weather tokyo`      | current weather in Tokyo
`/weather help`       | help message


  [geoip]: https://developers.google.com/maps/documentation/geocoding/start
  [darksky]: https://darksky.net/dev/
