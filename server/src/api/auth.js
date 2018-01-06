const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../config')

const emailRegex = /\S+@\S+\.\S+/

const sendErrorsFromDB = (res, dbErrors) => {
  const errors = []
  _.forIn(dbErrors.errors, error => errors.push(error.message))
  return res.status(400).json({ errors })
}

const login = (req, res, next) => {
  const email = req.body.email || ''
  const password = req.body.password || ''

  User.findOne({ email }, (err, user) => {
    if(err) return sendErrorsFromDB(res, err)
    // if user exists, check if password match
    if(user && bcrypt.compareSync(password, user.password)) {
      // create a jwt for this user  (jwt v8.^ requires a plain object as payload -> .toJSON() )
      const token = jwt.sign(user.toJSON(), env.authSecret, {
        expiresIn: '1 day'
      })
      const { name, email } = user
      return res.json({ name, email, token })
    }
    return res.status(400).send({ errors: ['Invalid user or password']})
  })
}

const validateToken = (req, res, next) => {
  const token = req.body.token || ''
  jwt.verify(token, env.authSecret, (err, decoded) => res.status(200).send({ valid: !err }))
}

const signup = (req, res, next) => {
  const name = req.body.name || ''
  const email = req.body.email || ''
  const password = req.body.password || ''
  const confirmPW = req.body.confirm_password || ''

  if(!email.match(emailRegex)) return res.status(400).send({ errors: ['Invalid email']})

  const salt = bcrypt.genSaltSync()
  const passwordHash = bcrypt.hashSync(password, salt)
  if(!bcrypt.compareSync(confirmPW, passwordHash)) return res.status(400).send({ errors: ['Passwords does not match']})

  User.findOne({ email }, (err, user) => {
    if(err) return sendErrorsFromDB(res, err)
    if(user) return res.status(400).send({ errors: ['User already registered']})

    const newUser = new User({ name, email, password: passwordHash})
    newUser.save(err => {
      if(err) return sendErrorsFromDB(res, err)
      login(req, res, next)
    })
  })
}

const authorization = (req, res, next) => {
  // Allows req with 'OPTIONS' method
  if(req.method === 'OPTIONS') return next()

  const token = req.body.token || req.query.token || req.headers['authorization']
  if(!token) return res.status(403).send({ errors: ['No token provided']})
  jwt.verify(token, env.authSecret, (err, decoded) => {
    if(err) return res.status(403).send({ errors: ['Falied to authenticate token']})
    // req.decoded = decoded  // Passing decoded token to next middleware
    next()
  })
}

module.exports = { login, signup, validateToken, authorization }