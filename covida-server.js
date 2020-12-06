'use strict'

const default_port = 8888
const port = process.argv[2] || default_port

const express = require('express')
const app = express()

const db = require('./covida-db.js')
const data = require('./igdb-data.js')

const serviceCreator = require('./covida-services.js')
const service = serviceCreator(db, data)

const webapiCreator = require('./covida-web-api.js')
const webapi = webapiCreator(app, service)

app.listen(port)