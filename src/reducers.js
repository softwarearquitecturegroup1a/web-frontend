export const ActionsType = {
  AUTH_SUCCESS: 0,
  AUTH_FAIL: 1,
  LOGIN: 2,
  LOGOUT: 3,
}

const initialState = {
  isAuthenticated: localStorage.getItem("auth") != null,
  user: localStorage.getItem("auth")
}

export const authReducers = (state = initialState, action) => {
  
  switch (action.type) {
    case ActionsType.LOGIN:
      if(!action.payload)
        return state
      var st={
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
      store(st);
      return st
    case ActionsType.LOGOUT:
      localStorage.removeItem("auth")
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }
    default:
      return state
  }

  
}
function store(props){
  console.log("Entro store");

  return localStorage.setItem("auth",props.user);
}

