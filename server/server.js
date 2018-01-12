const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const {
  BillingCycle,
  billingCyclePOST, billingCycleGET, billingCyclePUT, billingCycleDELETE,
  summary } = require('./api/billingCycle')
const env = require('./config')
const auth = require('./api/auth')

// ===== CONFIG =====

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

// ===== CORS =====

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

// ===== DATABASE =====

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB || 'mongodb://localhost/payment-adm', { useMongoClient: true })
.then(() => console.log('Successfully connected to database'))
.catch(err => console.log('Error connecting to database: '+err.message))

// ===== ROUTES =====

    // OPEN ROUTES
const openRouter = express.Router()
server.use('/oapi', openRouter)
openRouter.post('/login', auth.login)
openRouter.post('/signup', auth.signup)
openRouter.post('/validateToken', auth.validateToken)

    // PROTECTED ROUTES (JWT)
const protectedRouter = express.Router()
server.use('/api', protectedRouter)
// Add AUTHORIZATION middleware
protectedRouter.use(auth.authorization)
//  BillingCycle methods
protectedRouter.get('/billingCycles', billingCycleGET)
protectedRouter.post('/billingCycles', billingCyclePOST)
protectedRouter.put('/billingCycles/:id', billingCyclePUT)
protectedRouter.delete('/billingCycles/:id', billingCycleDELETE)

protectedRouter.get('/billingCycles/summary', summary)

server.use(express.static('public'))

server.listen(process.env.PORT || 3003, () => console.log('Server is up and running...'))
