import axios from 'axios'
import { toastr } from 'react-redux-toastr'

const BASE_URL = 'http://localhost:3003/api'

export function getList() {
  const req = axios.get(`${BASE_URL}/billingCycles`)
  return {
    type: 'BILLING_CYCLES_FETCHED',
    payload: req
  }
}

export function create(values) {
  axios.post(`${BASE_URL}/billingCycles`, values)
  .then(res => {
    toastr.success('Success', 'Task successfully completed!')
  })
  .catch(e => {
    // We've setted `errors` on server-side confir
    e.response.data.errors.forEach(err => toastr.error('Error ', err))
  })
  return {
    type: 'testing'
  }
}