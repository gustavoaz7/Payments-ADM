import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Row from '../common/layout/row'
import ValueBox from '../common/widget/valueBox'
import { getSummary } from './dashboardActions'

class Dashboard extends Component {

   componentWillMount() {
     this.props.getSummary()
   }

  render() {
    const { credit, debt } = this.props.summary

    return (
      <div>
        <ContentHeader title="Dashboard" small="Version 1.0" />
        <Content>
          <Row>
          <ValueBox cols="12 4" color="green" icon="bank"
            value={credit} text="Total Credit Balance"
          />
          <ValueBox cols="12 4" color="red" icon="credit-card"
            value={debt} text="Total Debt Balance"
          />
          <ValueBox cols="12 4" color="blue" icon="money"
            value={credit-debt} text="Total Cash Balance"
          />
          </Row>
        </Content>
      </div>
    )
  }
}

const mapStateProps = state => ({
  summary: state.dashboard.summary
})

const mapDispatchToProps = dispatch => bindActionCreators( {getSummary}, dispatch )

export default connect(mapStateProps, mapDispatchToProps)(Dashboard)