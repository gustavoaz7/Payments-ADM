import React, { Component } from 'react'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../common/layout/grid'
import Input from '../common/form/input'

class CreditList extends Component {

  add(i, item = {}) {
    if(!this.props.readOnly) {
      this.props.arrayInsert('billingCycleForm', 'credits', i, item)
    }
  }

  remove(i) {
    if(!this.props.readOnly && this.props.list.length > 1) {
      this.props.arrayRemove('billingCycleForm', 'credits', i)
    }
  }

  renderRows() {
    const list = this.props.list || []
    return list.map((item, i) => (
      <tr key={i}>
        <td>
          <Field name={`credits[${i}].name`} component={Input} 
          placeholder="Name" readOnly={this.props.readOnly}
          />
        </td>
        <td>
          <Field name={`credits[${i}].value`} component={Input} 
          placeholder="Value" readOnly={this.props.readOnly}
          />
        </td>
        <td>
          <button type="button" className="btn btn-success" 
            onClick={() => this.add(i+1)}>
            <i className="fa fa-plus"></i>
          </button>
          <button type="button" className="btn btn-warning" 
            onClick={() => this.add(i+1, item)}>
            <i className="fa fa-clone"></i>
          </button>
          <button type="button" className="btn btn-danger" 
            onClick={() => this.remove(i)}>
            <i className="fa fa-trash-o"></i>
          </button>
        </td>
      </tr>
    ))
  }

  render() {
    return (
      <Grid cols={this.props.cols}>
        <fieldset>
          <legend>Credits</legend>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th className="table-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
        </fieldset>
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch)
export default connect(null, mapDispatchToProps)(CreditList)