import { toastr } from 'react-redux-toastr'
import axios from 'axios'

import consts from '../consts'

export function login(values) {
  return submit(values, `${consts.OAPI_URL}/login`)
}

export function signup(values) {
  return submit(values, `${consts.OAPI_URL}/signup`)
}

function submit(values, url) {
  console.log('consts\n', consts);  
  return dispatch => {
    axios.post(url, values)
    .then(res => {
      dispatch([
        {type: 'USER_FETCHED', payload: res.data}
      ])
    })
    .catch(e => {
      console.log('catching error on submit action');
      console.log(e);
      e.response.data.errors.forEach(err => toastr.error('Error ', err))
    })
  }
}

export function logout() {
  return {type: 'TOKEN_VALIDATED', payload: false }
}

export function validateToken(token) {
  return dispatch => {
    if(token) {
      axios.post(`${consts.OAPI_URL}/validateToken`, { token })
      .then(res => {
        dispatch({ type: 'TOKEN_VALIDATED', payload: res.data.valid })
      })
      .catch(e => dispatch({ type: 'TOKEN_VALIDATED', payload: false }))
    } else {
      dispatch({ type: 'TOKEN_VALIDATED', payload: false })
    }
  }
}