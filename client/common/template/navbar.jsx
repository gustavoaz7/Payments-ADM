import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from '../../auth/authActions'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  render() {
    const { name, email } = this.props.user
    return (
      <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
          <li onMouseLeave={() => this.setState({ open: false })}
            className={`dropdown user user-menu ${this.state.open ? 'open' : ''}`}>
            <a href="javascript:;" onMouseEnter={() => this.setState({ open: true })} 
              className="dropdown-toggle" data-toggle="dropdown"
              aria-expanded={this.state.open ? 'true' : 'false'}>
              <img src="http://lorempixel.com/160/160/abstract" alt="User Image" className="user-image"/>
              <span className="hidden-xs">{name}</span>
            </a>
            <ul className="dropdown-menu">
              <li className="user-header">
                <img src="http://lorempixel.com/160/160/abstract" alt="User Image" className="img-circle"/>
                <p>{name} <small>{email}</small> </p>
              </li>
              <li className="user-footer">
                <div className="pull-right">
                  <a href="#" onClick={this.props.logout} className="btn btn-default btn-flat">Logout</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProsp = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProsp)(Navbar)