import {
  SET_REACTION_SUCCESS,
  SET_REACTION_ERROR,
  GET_CURRENT_USER_REACTION_SUCCESS,
  GET_CURRENT_USER_REACTION_ERROR,
  CLEAR_CURRENT_REACTION,
  DELETE_REACTION_ERROR,
  DELETE_REACTION_SUCCESS,
  GET_REACTIONS_ERROR,
  GET_REACTIONS_SUCCESS,
  NUM_OF_REACTIONS_SUCCESS,
  NUM_OF_REACTIONS_ERROR,
  CLEAR_REACTIONS,
} from "./constants";
import http from "../services/httpService";
import { toast } from "react-toastify";
const apiUrl = "http://localhost:5000";
const apiEndpoint = apiUrl + "/reactions";

export const setReaction = (data) => async (dispatch) => {
  try {
    const res = await http.post(apiEndpoint + "/setReaction", data);
    dispatch({
      type: SET_REACTION_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: SET_REACTION_ERROR,
    });
    toast.error(err.response.data);
  }
};
export const getCurrentUserReaction = (blogId) => async (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_REACTION,
  });
  try {
    const res = await http.get(apiEndpoint + "/currentUserReaction/" + blogId);
    dispatch({
      type: GET_CURRENT_USER_REACTION_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CURRENT_USER_REACTION_ERROR,
    });
  }
};
export const deleteReaction = (blogId, userName) => async (dispatch) => {
  try {
    const res = await http.delete(
      apiEndpoint + "/remove/" + blogId + "/" + userName
    );
    dispatch({
      type: DELETE_REACTION_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_REACTION_ERROR,
    });
    toast.error(err.response.data);
  }
};

export const getReactions = (blogId, type, page, prevType) => async (
  dispatch
) => {
  if (prevType) page = 1;
  if (type !== "" || prevType)
    dispatch({
      type: CLEAR_REACTIONS,
    });
  try {
    const res = await http.get(
      apiEndpoint + "/getAll/" + page + "/" + blogId + "?type=" + type
    );
    dispatch({
      type: GET_REACTIONS_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_REACTIONS_ERROR,
    });
  }
};
export const numOfReactions = (blogId) => async (dispatch) => {
  try {
    const res = await http.get(apiEndpoint + "/numOfReactions/" + blogId);

    dispatch({
      type: NUM_OF_REACTIONS_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: NUM_OF_REACTIONS_ERROR,
    });
  }
};
