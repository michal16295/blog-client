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
  DELETE_ACCOUNT_ERROR,
  DELETE_ACCOUNT_SUCCESS,
} from "../action/constants";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: "",
};

export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case USER_LOADED:
    case CHANGE_PASS_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: data,
      };

    case LOGIN_SUCCESS:
    case CHANGE_PASS_ERROR:
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...data,
        isAuthenticated: true,
        loading: false,
      };
    case DELETE_ACCOUNT_ERROR:
      console.log(data);
      return {
        ...state,
        error: data.data,
        loading: false,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case DELETE_ACCOUNT_SUCCESS:
      localStorage.removeItem("token");
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
