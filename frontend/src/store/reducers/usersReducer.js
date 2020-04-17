import {LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS} from "../actions/usersActions";

const initialState = {
  user: null
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {...state, user: action.user};
    case LOGOUT_USER_SUCCESS:
      return {...state, user: null};
    default:
      return state;
  }
};

export default usersReducer;