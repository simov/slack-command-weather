
var path = require('path')
var express = require('express')
var parser = require('body-parser')

var weather = require('../')
var auth = require(path.resolve(process.cwd(), process.argv[2]))


express()
  .use(parser.urlencoded({extended: true}))
  .use(parser.json())
  .use('/weather', (req, res) => {
    var input = req.body
    res.json(weather.respond({auth, input}))
    weather.query({auth, input}).catch(console.error)
  })
  .listen(4005)
