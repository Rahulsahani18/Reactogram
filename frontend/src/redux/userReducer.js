const initialState = {
    user: null, // or user: {} depending on how you want to handle an unauthenticated state
  }
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return {
          ...state, 
          user: action.payload
        };
      case "LOGIN_ERROR":
        return {
          ...state, 
          user: null // or user: {} if you prefer
        };
      default:
        return state; // Return the current state for unrelated actions
    }
  }
  