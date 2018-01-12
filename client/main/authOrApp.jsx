import '../common/template/dependencies'

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import App from './app'
import Auth from '../auth/auth'
import { validateToken } from '../auth/authActions'

class AuthOrApp extends Component {
  componentWillMount() {
    if(this.props.auth.user) 
      this.props.validateToken(this.props.auth.user.token)
  }

  render() {
    const { user, validToken } = this.props.auth
    if(user && validToken) {
      // Setting 'authorization' into header of every req from axios
      axios.defaults.headers.common['authorization'] = user.token
      return <App>{this.props.children}</App>
    } else if (!user && !validToken) {
      return <Auth />
    } else {
      return false  // Waits response from componentWillMount() to show eiter App or Auth
    }
  }
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)