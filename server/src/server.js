const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const BillingCycle = require('./api/billingCycle')

// ===== CONFIG =====

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())


// ===== DATABASE =====

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/payment-adm', { useMongoClient: true })
.then(() => console.log('Successfully connected to database'))
.catch(err => console.log('Error connecting to database: '+err.message))


// ===== ROUTES =====

const router = express.Router()
server.use('/api', router)
BillingCycle.register(router, '/billingCycles')


server.listen(process.env.PORT || 3003, () => console.log('Server is up and running...'))
