import { CREATE_COMMENT_SUCCESS, CREATE_COMMENT_ERROR } from "./constants";
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
