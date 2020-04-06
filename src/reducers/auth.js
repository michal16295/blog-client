import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CHANGE_PASS_ERROR,
  CHANGE_PASS_SUCCESS,
  CLEAR_CURRENT
} from "../action/constants";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case USER_LOADED:
    case CHANGE_PASS_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: data
      };

    case LOGIN_SUCCESS:
    case CHANGE_PASS_ERROR:
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...data,
        isAuthenticated: true,
        loading: false
      };

    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
