import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getList, showUpdate, showDelete } from './billingCycleActions'

class BillingCycleList extends Component {

  componentWillMount() {
    this.props.getList()
  }

  renderRows() {
    const list = this.props.list || []
    return list.map(bilCyc => (
      <tr key={bilCyc._id}>
        <td>{bilCyc.name}</td>
        <td>{bilCyc.month}</td>
        <td>{bilCyc.year}</td>
        <td>
          <button className="btn btn-warning" onClick={() => this.props.showUpdate(bilCyc) }>
            <i className="fa fa-pencil"></i>
          </button>
          <button className="btn btn-danger" onClick={() => this.props.showDelete(bilCyc) }>
            <i className="fa fa-trash-o"></i>
          </button>
        </td>
      </tr>
    ))
  }
  
  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Month</th>
              <th>Year</th>
              <th className="table-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  list: state.billingCycle.list
})

const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList)