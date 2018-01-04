import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form' // initialize - set the initial values in the form
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = { credits: [{}], debts: [{}] }

export function getList() {
  const req = axios.get(`${BASE_URL}/billingCycles`)
  return {
    type: 'BILLING_CYCLES_FETCHED',
    payload: req
  }
}

export function create(values) {
  return submit(values, 'post')
}

export function update(values) {
  return submit(values, 'put')
}

export function remove(values) {
  return submit(values, 'delete')
}

// Helper function - NOT EXPORTED
function submit(values, method) {
  return dispatch => {
    const id = values._id ? values._id : ''
    axios[method](`${BASE_URL}/billingCycles/${id}`, values)
    .then(res => {
      toastr.success('Success', 'Task successfully completed!')
      dispatch(init())
    })
    .catch(e => {
      // We've setted `errors` on server-side confir
      e.response.data.errors.forEach(err => toastr.error('Error ', err))
    })
  }
}

// middleware `multi` allows to pass in an array to dispatch
export function showUpdate(billingCycle) {
  return [
    showTabs('tabUpdate'),
    selectTab('tabUpdate'),
    initialize('billingCycleForm', billingCycle)
  ]
} 

export function showDelete(billingCycle) {
  return [
    showTabs('tabDelete'),
    selectTab('tabDelete'),
    initialize('billingCycleForm', billingCycle)
  ]
} 

export function init() {
  return [
    showTabs('tabList', 'tabCreate'),
    selectTab('tabList'),
    getList(),
    initialize('billingCycleForm', INITIAL_VALUES)
  ]
}