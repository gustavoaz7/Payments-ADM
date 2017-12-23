import axios from 'axios'

const BASE_URL = 'http://localhost:3003/api'

export function getList() {
  const req = axios.get(`${BASE_URL}/billingCycles`)
  return {
    type: 'BILLING_CYCLES_FETCHED',
    payload: req
  }
}