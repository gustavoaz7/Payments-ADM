const userKey = 'paymentADM_user'
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem(userKey)),  // storing user from login
  validToken: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOKEN_VALIDATED':
      // Valid token
      if(action.payload) return { ...state, validToken: true }
      // User logout
      localStorage.removeItem(userKey)
      return { ...state, validToken: false, user: null }
    case 'USER_FETCHED':
      // User login
      localStorage.setItem(userKey, JSON.stringify(action.payload))
      return { ...state, validToken: true, user: action.payload}
    default:
      return state
  }
}