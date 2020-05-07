import {
  GET_NOTIFY_ERROR,
  GET_NOTIFY_SUCCESS,
  SET_VIEWED_TRUE,
  SET_SETTINGS_ERROR,
  SET_SETTINGS_SUCCESS,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_ERROR,
} from "./constants";
import http from "../services/httpService";
import { toast } from "react-toastify";

const apiUrl = "http://localhost:5100";
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
    toast.error(err.response.data);
  }
};

export const setNotifySettings = (data) => async (dispatch) => {
  try {
    const res = await http.post(apiEndpoint + "/settings", data);
    dispatch({
      type: SET_SETTINGS_SUCCESS,
      data: res.data,
    });
    toast.success("Settings Changed");
  } catch (err) {
    dispatch({
      type: SET_SETTINGS_ERROR,
      data: err.response.data,
    });
    toast.error(err.response.data);
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

export const setViewedAll = () => async (dispatch) => {
  try {
    const res = await http.put(apiEndpoint + "/checkAll");
    dispatch({
      type: SET_VIEWED_TRUE,
      data: res.data,
    });
    dispatch(getNotifications());
  } catch (err) {
    toast.error(err.response.data);
  }
};
