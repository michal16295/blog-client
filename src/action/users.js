import {
  ALL_USERS_ERROR,
  ALL_USERS_SUCCESS,
  GET_USER,
  GET_USER_ERROR,
  EDIT_ERROR,
  EDIT_SUCCESS,
  CLEAR_CURRENT
} from "./constants";
import http from "../services/httpService";
import { setAlert } from "./alert";

const apiUrl = "http://localhost:5000";
const apiEndpoint = apiUrl + "/users";
const tokenKey = "token";

//GET ALL USERS
export const getProfiles = (page, search) => async dispatch => {
  try {
    let res = await http.get(
      apiEndpoint + "/all/" + page + "?search=" + search
    );
    dispatch({
      type: ALL_USERS_SUCCESS,
      data: res.data[0]
    });
  } catch (err) {
    dispatch({
      type: ALL_USERS_ERROR
    });
  }
};
//GET USER
export const getProfile = userName => async dispatch => {
  try {
    let res = await http.get(apiEndpoint + "/" + userName);
    dispatch({
      type: GET_USER,
      data: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_USER_ERROR
    });
    if (err.response.status === 404) window.location = "/notFound";
  }
};
//UPDATE USER
export const editUser = (id, data) => async dispatch => {
  try {
    let res = await http.put(apiEndpoint + "/edit/" + id, data);
    dispatch({
      type: EDIT_SUCCESS,
      data: res.data
    });
    setTimeout(() => {
      window.location = "/currentUser";
    }, 500);
  } catch (err) {
    dispatch({
      type: EDIT_ERROR,
      data: err.response.data
    });
    dispatch(setAlert(err.response.data, "danger"));
  }
};
//RANDOM AVATAR
export const getRandomAvatar = () => async dispatch => {
  try {
    const res = await http.get(apiEndpoint + "/avatar/random");
    return res.data;
  } catch (err) {}
};
