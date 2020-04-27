import {
  GET_NOTIFY_ERROR,
  GET_NOTIFY_SUCCESS,
  SET_VIEWED_TRUE,
  SET_SETTINGS_ERROR,
  SET_SETTINGS_SUCCESS,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_ERROR,
  CLEAR_NOTIFY,
} from "./constants";
import http from "../services/httpService";
import { setAlert } from "./alert";

const apiUrl = "http://localhost:5000";
const apiEndpoint = apiUrl + "/notifications";

export const getNotifications = (page) => async (dispatch) => {
  try {
    const res = await http.get(apiEndpoint + "/" + page);
    dispatch({
      type: GET_NOTIFY_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_NOTIFY_ERROR,
    });
  }
};

export const updateViewed = (id) => async (dispatch) => {
  try {
    const res = await http.put(apiEndpoint + "/viewed/" + id);
    dispatch({
      type: SET_VIEWED_TRUE,
      data: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.message, "danger"));
  }
};

export const setNotifySettings = (data) => async (dispatch) => {
  console.log(data);
  try {
    const res = await http.post(apiEndpoint + "/settings", data);
    console.log(res);
    dispatch({
      type: SET_SETTINGS_SUCCESS,
      data: res.data,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (err) {
    dispatch({
      type: SET_SETTINGS_ERROR,
      data: err.response.data,
    });
  }
};

export const getSettings = () => async (dispatch) => {
  try {
    const res = await http.get(apiEndpoint + "/getWebSettings");
    dispatch({
      type: GET_SETTINGS_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SETTINGS_ERROR,
      data: err.response.data,
    });
  }
};
