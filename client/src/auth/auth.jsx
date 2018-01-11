import './auth.css'

import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, signup } from './authActions'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import If from '../common/operator/if'
import Messages from '../common/msg/messages'
import Input from '../common/form/inputAuth'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = { loginMode: true }
  }

  changeMode() {
    this.setState({ loginMode: !this.state.loginMode })
  }

  onSubmit(values) {
    const { login, signup } = this.props
    this.state.loginMode ? login(values) : signup(values)
  }

  render() {
    const { loginMode } = this.state
    const { handleSubmit } = this.props
    return (
      <div className="login-box">
        <div className="login-logo"> <b>Payment</b>ADM </div>
        <div className="login-box-body">
          <p className="login-box-msg">Welcome!</p>
          <form onSubmit={handleSubmit(val => this.onSubmit(val))}>
            <Field component={Input} type="input" name="name"
              placeholder="Name" icon="user" hide={loginMode} 
            />
            <Field component={Input} type="email" name="email"
              placeholder="Email" icon="envelope"
            />
            <Field component={Input} type="password" name="password"
              placeholder="Password" icon="lock"
            />
            <Field component={Input} type="password" name="confirm_password"
              placeholder="Confirm password" icon="lock" hide={loginMode} 
            />
            <Row>
              <Grid cols="4">
                <button type="submit"
                  className="btn btn-primary btn-block btn-flat">
                  {loginMode ? 'Login' : 'Register'}
                </button>
              </Grid>
            </Row>
          </form>
          <br />
          <a onClick={() => this.changeMode()}>
            {loginMode ? 'New user? Sign up here!' : 'Already registered? Login here!'}
          </a>
        </div>
        <Messages />
      </div>
    )
  }
}

Auth = reduxForm({ form: 'authFrom' })(Auth)

const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch)

export default connect(null, mapDispatchToProps)(Auth)