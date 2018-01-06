import React from 'react'

import If from '../operator/if'

export default props => (
  <If test={!props.hide}>
    <div className="form-group has-feedback">
      {/* props.input -> Adding all properties passed in from Field component (from redux-form) */}
      <input {...props.input}
        type={props.type} 
        className="form-control"
        placeholder={props.placeholder} />
      <span className={`glyphicon glyphicon-${props.icon} form-control-feedback`}></span>
    </div>
  </If>
)