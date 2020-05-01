import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CHANGE_PASS_SUCCESS,
  CHANGE_PASS_ERROR,
  CLEAR_CURRENT_USER,
} from "./constants";
import http from "../services/httpService";
import { getNotifications, getSettings } from "./notifications";
import { unreadMsg } from "./chat";
import ChatSocketServer from "../services/socketService";
import { toast } from "react-toastify";
const apiUrl = "http://localhost:5000";
const apiEndpoint = apiUrl + "/users";
const tokenKey = "token";

//GET CURRENT USER
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    http.setJwt(localStorage.token);
  }
  try {
    let res = await http.get(apiEndpoint + "/api/currentUser", {
      withCredentials: true,
    });
    if (res.data === "") res = await http.get(apiEndpoint + "/me");
    dispatch({
      type: USER_LOADED,
      data: res.data,
    });
    ChatSocketServer.establishSocketConnection(res.data._id);
    ChatSocketServer.listenToSocket();
    ChatSocketServer.login(res.data.userName);
    dispatch(getNotifications());
    dispatch(getSettings());
    dispatch(unreadMsg());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    toast.error(err.response.data);
  }
};
//GET CURRENT TOKEN
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

//REGISTER USER
export const register = (user) => async (dispatch) => {
  try {
    const res = await http.post(apiEndpoint + "/register", user);
    dispatch({
      type: REGISTER_SUCCESS,
      data: res.data,
    });
    localStorage.setItem("token", res.headers["x-auth-token"]);
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });
    toast.error(err.response.data);
  }
};
//LOGIN USER
export const login = (user) => async (dispatch) => {
  try {
    const res = await http.post(apiEndpoint + "/login", user);
    dispatch({
      type: LOGIN_SUCCESS,
      data: res.data,
    });
    localStorage.setItem("token", res.headers["x-auth-token"]);
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    toast.error(err.response.data);
  }
};
//LOGOUT
export const logout = (userName) => async (dispatch) => {
  ChatSocketServer.logout(userName);
  window.location = "/";
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
// GOOGLE SIGN UP
export const googleSignUp = () => {
  window.location = apiEndpoint + "/auth/google";
};
//CHANGE PASSWORD
export const changePass = (id, newPassword) => async (dispatch) => {
  try {
    const res = await http.put(apiEndpoint + "/changePass/" + id, newPassword);
    dispatch({
      type: CHANGE_PASS_SUCCESS,
      data: res.data,
    });
    toast.success("Password Changed");
    setTimeout(() => {
      window.location = "/";
    }, 1000);
  } catch (err) {
    dispatch({
      type: CHANGE_PASS_ERROR,
    });
    toast.error(err.response.data);
  }
};
