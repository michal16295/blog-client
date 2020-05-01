import {
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  GET_ALL_COMMENTS_ERROR,
  GET_ALL_COMMENTS_SUCCESS,
  CLEAR_CURRENT_COMMENTS,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  EDIT_COMMENT_ERROR,
  EDIT_COMMENT_SUCCESS,
} from "./constants";
import http from "../services/httpService";
import { toast } from "react-toastify";
const apiUrl = "http://localhost:5000";
const apiEndpoint = apiUrl + "/comments";

export const createComment = (data) => async (dispatch) => {
  try {
    const res = await http.post(apiEndpoint + "/create", data);
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_COMMENT_ERROR,
    });
    toast.error(err.response.data);
  }
};
export const getComments = (page, blogId, newReq) => async (dispatch) => {
  if (newReq)
    dispatch({
      type: CLEAR_CURRENT_COMMENTS,
    });
  try {
    const res = await http.get(apiEndpoint + "/getAll/" + page + "/" + blogId);
    dispatch({
      type: GET_ALL_COMMENTS_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_COMMENTS_ERROR,
    });
  }
};
export const editComment = (data) => async (dispatch) => {
  try {
    const res = await http.put(apiEndpoint + "/edit", data);
    dispatch({
      type: EDIT_COMMENT_SUCCESS,
      data: res.data,
    });
    window.location.reload();
  } catch (err) {
    dispatch({
      type: EDIT_COMMENT_ERROR,
      error: err.response,
    });
    toast.error(err.response.data);
  }
};
export const deleteComment = (id) => async (dispatch) => {
  try {
    const res = await http.delete(apiEndpoint + "/delete/" + id);
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_COMMENT_ERROR,
      error: err.response,
    });
    toast.error(err.response.data);
  }
};
