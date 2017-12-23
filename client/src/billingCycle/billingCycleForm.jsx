import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

import labelAndInput from '../common/form/labelAndInput'

class BillingCycleForm extends Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <form role="role" onSubmit={handleSubmit}>
        <div className="box-body">
          <Field name="name" component={labelAndInput} 
            label="Name" cols='12 4' placeholder="Name"
          />
          <Field name="month" component={labelAndInput} 
            label="Month" cols='12 4' placeholder="Month" type="number"
          />
          <Field name="year" component={labelAndInput} 
            label="Year" cols="12 4" placeholder="Year" type="number"
          />
        </div>
        <div className="box-footer">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: "billingCycleForm" })(BillingCycleForm)