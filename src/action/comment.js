import {
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  GET_ALL_COMMENTS_ERROR,
  GET_ALL_COMMENTS_SUCCESS,
  CLEAR_CURRENT_COMMENTS
} from "./constants";
import http from "../services/httpService";
import { setAlert } from "./alert";

const apiUrl = "http://localhost:5000";
const apiEndpoint = apiUrl + "/comments";

export const createComment = data => async dispatch => {
  try {
    const res = await http.post(apiEndpoint + "/create", data);
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      data: res.data
    });
  } catch (err) {
    dispatch({
      type: CREATE_COMMENT_ERROR
    });
  }
};
export const getComments = (page, blogId, newReq) => async dispatch => {
  if (newReq)
    dispatch({
      type: CLEAR_CURRENT_COMMENTS
    });
  try {
    const res = await http.get(apiEndpoint + "/getAll/" + page + "/" + blogId);
    dispatch({
      type: GET_ALL_COMMENTS_SUCCESS,
      data: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_COMMENTS_ERROR
    });
  }
};
