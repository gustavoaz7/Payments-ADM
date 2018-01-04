import React, { Component } from 'react'

import Grid from '../common/layout/grid'
import Row from '../common/layout/row'
import ValueBox from '../common/widget/valueBox'

export default ({credit, debt}) => (  // destructuring credit and debt from props
  <Grid cols="12">
    <fieldset>
      <legend>Summary</legend>
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
    </fieldset>
  </Grid>
)