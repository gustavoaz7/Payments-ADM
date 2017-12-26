import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import labelAndInput from '../common/form/labelAndInput'
import { init } from './billingCycleActions'

class BillingCycleForm extends Component {
  render() {
    const { handleSubmit, readOnly } = this.props

    return (
      <form role="role" onSubmit={handleSubmit}>
        <div className="box-body">
          <Field name="name" component={labelAndInput} readOnly={readOnly}
            label="Name" cols='12 4' placeholder="Name"
          />
          <Field name="month" component={labelAndInput} readOnly={readOnly}
            label="Month" cols='12 4' placeholder="Month" type="number"
          />
          <Field name="year" component={labelAndInput} readOnly={readOnly}
            label="Year" cols="12 4" placeholder="Year" type="number"
          />
        </div>
        <div className="box-footer">
          <button type="submit" className={`btn btn-${this.props.submitClass}`}>
            {this.props.submitLabel}
          </button>
          <button type="button" className="btn btn-default"
            onClick={this.props.init}>
            Cancel
          </button>
        </div>
      </form>
    )
  }
}

BillingCycleForm = reduxForm({ form: "billingCycleForm", destroyOnUnmount: false })(BillingCycleForm)
// destroyOnUnmount - Setting it to false lets us use the form data after that component is unmounted
    // Lets us use the form data on update initialization since they use the same Form component
    // And for our dynamic form (future)

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)

export default connect(null, mapDispatchToProps)(BillingCycleForm)