import {
  ALL_USERS_ERROR,
  ALL_USERS_SUCCESS,
  GET_USER,
  GET_USER_ERROR,
  EDIT_ERROR,
  EDIT_SUCCESS,
  CLEAR_CURRENT_USER,
  DELETE_ACCOUNT_ERROR,
  DELETE_ACCOUNT_SUCCESS,
  GET_AVATAR_ERROR,
  GET_AVATAR_SUCCESS,
} from "./constants";
import http from "../services/httpService";
import { toast } from "react-toastify";
const apiUrl = "http://localhost:5100";
const apiEndpoint = apiUrl + "/users";

//GET ALL USERS
export const getProfiles = (page, search) => async (dispatch) => {
  if (search === "")
    dispatch({
      type: CLEAR_CURRENT_USER,
    });
  try {
    let res = await http.get(
      apiEndpoint + "/all/" + page + "?search=" + search
    );
    dispatch({
      type: ALL_USERS_SUCCESS,
      data: res.data[0],
    });
  } catch (err) {
    dispatch({
      type: ALL_USERS_ERROR,
    });
    toast.error(err.response.data);
  }
};
//GET USER
export const getProfile = (userName) => async (dispatch) => {
  try {
    let res = await http.get(apiEndpoint + "/" + userName);
    dispatch({
      type: GET_USER,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_ERROR,
    });
    if (err.response.status === 404) window.location = "/notFound";
  }
};
//UPDATE USER
export const editUser = (id, data) => async (dispatch) => {
  try {
    let res = await http.put(apiEndpoint + "/edit/" + id, data);
    dispatch({
      type: EDIT_SUCCESS,
      data: res.data,
    });
    setTimeout(() => {
      window.location = "/currentUser";
    }, 500);
  } catch (err) {
    dispatch({
      type: EDIT_ERROR,
      data: err.response.data,
    });
    toast.error(err.response.data);
  }
};
export const getUserAvatar = (userName) => async (dispatch) => {
  try {
    let res = await http.get(apiEndpoint + "/getAvatar/" + userName);
    res = {
      userName,
      avatar: res.data.avatar,
    };
    dispatch({
      type: GET_AVATAR_SUCCESS,
      data: res,
    });
  } catch (err) {
    dispatch({
      type: GET_AVATAR_ERROR,
      data: err.response.data,
    });
    toast.error(err.response.data);
  }
};
//DELETE ACCOUNT
export const deleteAccount = (data) => async (dispatch) => {
  try {
    const res = await http.post(apiEndpoint + "/deleteAccount", data);
    dispatch({
      type: DELETE_ACCOUNT_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_ACCOUNT_ERROR,
      data: err.response,
    });
    toast.error(err.response.data);
  }
};
