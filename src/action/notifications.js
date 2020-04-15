import {
  GET_NOTIFY_ERROR,
  GET_NOTIFY_SUCCESS,
  SET_VIEWED_TRUE,
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
