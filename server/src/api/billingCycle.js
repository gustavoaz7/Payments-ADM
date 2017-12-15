const restful = require('node-restful')
const mongoose = restful.mongoose
const _ = require('lodash')

 // ===== SCHEMAS =====

const creditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, min: 0, required: true }
})

const debtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, min: 0, required: true },
  status: { 
    type: String, 
    required: false, 
    uppercase: true, 
    enum: ['PAID', 'PENDING', 'SCHEDULED'] 
  }
})

const billingCycleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  month: { type: Number, min: 1, max: 12, required: true },
  year: { type: Number, min: 1950, max: 2100, required: true },
  credits: [ creditSchema ],
  debts: [ debtSchema ]
})

// ===== MODEL =====

const BillingCycle = restful.model('BillingCycle', billingCycleSchema)


// ===== SERVICES =====

BillingCycle.methods(['get', 'post', 'put', 'delete'])
// new: returns the updated object. runValidators: apply schema constrains on PUT request too
BillingCycle.updateOptions({ new: true, runValidators: true })


module.exports = BillingCycle