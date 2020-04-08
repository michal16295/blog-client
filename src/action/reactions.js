import {
  SET_REACTION_SUCCESS,
  SET_REACTION_ERROR,
  GET_CURRENT_USER_REACTION_SUCCESS,
  GET_CURRENT_USER_REACTION_ERROR,
  CLEAR_CURRENT_REACTION,
  DELETE_REACTION_ERROR,
  DELETE_REACTION_SUCCESS,
  GET_REACTIONS_ERROR,
  GET_REACTIONS_SUCCESS
} from "./constants";
import http from "../services/httpService";
import { setAlert } from "./alert";

const apiUrl = "http://localhost:5000";
const apiEndpoint = apiUrl + "/reactions";

export const setReaction = data => async dispatch => {
  try {
    const res = await http.post(apiEndpoint + "/setReaction", data);
    dispatch({
      type: SET_REACTION_SUCCESS,
      data: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_REACTION_ERROR
    });
  }
};
export const getCurrentUserReaction = blogId => async dispatch => {
  dispatch({
    type: CLEAR_CURRENT_REACTION
  });
  try {
    const res = await http.get(apiEndpoint + "/currentUserReaction/" + blogId);
    dispatch({
      type: GET_CURRENT_USER_REACTION_SUCCESS,
      data: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CURRENT_USER_REACTION_ERROR
    });
  }
};
export const deleteReaction = (blogId, userName) => async dispatch => {
  try {
    const res = await http.delete(
      apiEndpoint + "/remove/" + blogId + "/" + userName
    );
    dispatch({
      type: DELETE_REACTION_SUCCESS,
      data: res.data
    });
  } catch (err) {
    dispatch({
      type: DELETE_REACTION_ERROR
    });
  }
};

export const getReactions = (blogId, type, page) => async dispatch => {
  try {
    const res = await http.get(
      apiEndpoint + "/getAll/" + page + "/" + blogId + "?type=" + type
    );
    dispatch({
      type: GET_REACTIONS_SUCCESS,
      data: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_REACTIONS_ERROR
    });
  }
};
