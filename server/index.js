'use strict'

// REQUIRE DEPENDENCIES
var express = require('express')
var bodyParser = require('body-parser')

// USE EXPRESS
var app = express()

// REQUIRE ROUTES
var routes = require('./routers/index')

//  CORS FOR API
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, OPTIONS'
    )
    next()
})

// BODY PARSE FOR API
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// APPEND ON BASE_URL /api
app.use('/api', routes)

// PORT LISTEN SERVER
app.listen(7001, function() {
    console.log('Server Found: http://localhost:7001')
})
