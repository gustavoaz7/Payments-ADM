import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LabelAndInput from '../common/form/labelAndInput'
import { init } from './billingCycleActions'
import CreditList from './creditList'

class BillingCycleForm extends Component {
  render() {
    const { handleSubmit, readOnly, credits } = this.props

    return (
      <form role="role" onSubmit={handleSubmit}>
        <div className="box-body">
          <Field name="name" component={LabelAndInput} readOnly={readOnly}
            label="Name" cols='12 4' placeholder="Name"
          />
          <Field name="month" component={LabelAndInput} readOnly={readOnly}
            label="Month" cols='12 4' placeholder="Month" type="number"
          />
          <Field name="year" component={LabelAndInput} readOnly={readOnly}
            label="Year" cols="12 4" placeholder="Year" type="number"
          />
          <CreditList cols="12 6" readOnly={readOnly} list={credits} />
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

const selector = formValueSelector('billingCycleForm')  // grabs information from given form
const mapStateToProps = state => ( {credits: selector(state, 'credits')} )  // arguments: state and attr name

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)