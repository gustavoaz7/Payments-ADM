const restful = require('node-restful')
const mongoose = require('mongoose')
const _ = require('lodash')

 // ===== SCHEMAS =====

const creditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, min: 0, required: true }
})

const debtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, min: 0, required: true },
  status: { type: String, required: false, uppercase: true  }
})

const billingCycleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  month: { type: Number, min: 1, max: 12, required: true },
  year: { type: Number, min: 1950, max: 2100, required: true },
  credits: [ creditSchema ],
  debts: [ debtSchema ],
  author: {
    email: String
  }
})

// ===== MODEL =====

const BillingCycle = restful.model('BillingCycle', billingCycleSchema)


// ===== SERVICES =====

BillingCycle.methods(['get', 'put', 'delete'])  
  // BillingCycle POST method will be separated so we can add the author.
const billingCyclePOST = (req, res) => {

  const newBillingCycle = {
      name: req.body.name,
      month: req.body.month,
      year: req.body.year,
      credits: req.body.credits,
      debts: req.body.debts,
      author: {
        email: req.loggedUser.email
      }
  }
  BillingCycle.create(newBillingCycle, (err, data) => {
      if(err || !data) return res.status(500).json({ errors: err })
      res.status(200).json({ data })
  })
}

// new: returns the updated object. runValidators: apply schema constrains on PUT request too
BillingCycle.updateOptions({ new: true, runValidators: true })


// ===== ERROR HANDLING =====

BillingCycle.after('post', errorHandler).after('put', errorHandler)

function errorHandler(req, res, next) {
  if (res.locals.bundle.errors){
    const errors = []
    _.forIn(res.locals.bundle.errors, err => errors.push(err.message))
    return res.status(500).json({ errors })
  }
  next()
}


// ===== ROUTES =====

BillingCycle.route('summary', (req, res, next) => {
  BillingCycle.aggregate(
    // Filtering entries created by logged user (req.loggedUser from authorization middleware)
    { $match: { author: { email: req.loggedUser.email } } },
    {
      $project: {   // Sum of all credits and debts for each record
        credit: {$sum: "$credits.value"},
        debt: {$sum: "$debts.value"}
      }
    }, {
      $group: {     // Sum of all projected credit and debt (entire collection)
        _id: null,
        credit: {$sum: "$credit"},
        debt: {$sum: "$debt"}
      }
    }, {
      $project: { _id: 0, credit: 1, debt: 1 } // 0-False  1-Tre
    }, (err, result) => {
      if(err) return res.status(500).json({ errors: [err] })
      // result[0] because our result is a single value (group: _id: null)
      res.json(result[0] || { credit: 0, debt: 0 })
    }
  )
})


module.exports = { BillingCycle, billingCyclePOST }