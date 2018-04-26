export const ActionsType = {
  AUTH_SUCCESS: 0,
  AUTH_FAIL: 1,
  LOGIN: 2,
  LOGOUT: 3,
}

const initialState = {
  isAuthenticated: false,
  user: null
}

export const authReducers = (state = initialState, action) => {
  
  switch (action.type) {
    case ActionsType.LOGIN:
      if(!action.payload)
        return state
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case ActionsType.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }
    default:
      return state
  }
}