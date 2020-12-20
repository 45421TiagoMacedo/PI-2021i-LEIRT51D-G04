'use strict'

const storage_host = 'localhost'
const storage_port = 9200

const default_port = 8888
const port = process.argv[2] || default_port

const express = require('express')
const app = express()

const storageCreator = require('./covida-db-elasticsearch.js')
const db = storageCreator(storage_host, storage_port)

//const db = require('./covida-db.js')

const data = require('./igdb-data.js')

const serviceCreator = require('./covida-services.js')
const service = serviceCreator(db, data)

const webapiCreator = require('./covida-web-api.js')
const webapi = webapiCreator(app, service)

app.listen(port)