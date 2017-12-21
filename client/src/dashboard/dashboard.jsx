import React, { Component } from 'react'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Row from '../common/layout/row'
import ValueBox from '../common/widget/valueBox'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <ContentHeader title="Dashboard" small="Version 1.0" />
        <Content>
          <Row>
          <ValueBox cols="12 4" color="green" icon="bank"
            value="10.00" text="Total Credit Balance"
          />
          <ValueBox cols="12 4" color="red" icon="credit-card"
            value="8.00" text="Total Debt Balance"
          />
          <ValueBox cols="12 4" color="blue" icon="money"
            value="2.00" text="Total Cash Balance"
          />
          </Row>
        </Content>
      </div>
    )
  }
}

export default Dashboard