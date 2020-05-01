import {
  SEND_MESSAGE_ERROR,
  SEND_MESSAGE_SUCCESS,
  GET_MESSAGES_ERROR,
  GET_MESSAGES_SUCCESS,
  RECENT_CONVERSATION_ERROR,
  RECENT_CONVERSATION_SUCCESS,
  CLEAR_MESSAGES,
  GET_UNREAD_MSG_ERROR,
  GET_UNREAD_MSG_SUCCESS,
  GET_UNREAD_MSG_PER_PERSON_SUCCESS,
  GET_UNREAD_MSG_PER_PERSON_ERROR,
  UNBLOCK_USER_ERROR,
  UNBLOCK_USER_SUCCESS,
  GET_BLOCKED_USERS_ERROR,
  GET_BLOCKED_USERS_SUCCESS,
} from "./constants";
import http from "../services/httpService";
import { toast } from "react-toastify";
const apiUrl = "http://localhost:5000";
const apiEndpoint = apiUrl + "/chat";

export const sendMsg = (data) => (dispatch) => {
  try {
    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      data: data,
    });
    dispatch(recentConve());
  } catch (err) {
    dispatch({
      type: SEND_MESSAGE_ERROR,
    });
    toast.error(err.response.data);
  }
};
export const getMsgs = (reciever, page) => async (dispatch) => {
  if (page === 1)
    dispatch({
      type: CLEAR_MESSAGES,
    });
  try {
    const res = await http.get(
      apiEndpoint + "/getMessages/" + reciever + "/" + page
    );
    dispatch({
      type: GET_MESSAGES_SUCCESS,
      data: res.data,
    });
    dispatch(getNumUnreadMsgs(reciever));
    dispatch(unreadMsg());
  } catch (err) {
    dispatch({
      type: GET_MESSAGES_ERROR,
      data: err.response,
    });
    toast.error(err.response.data);
  }
};
export const getNumUnreadMsgs = (reciever) => async (dispatch) => {
  try {
    let res = await http.get(apiEndpoint + "/unreadMsgs/" + reciever);
    res = {
      reciever,
      notViewed: res.data.notViewed,
    };
    dispatch(recentConve());
    dispatch({
      type: GET_UNREAD_MSG_PER_PERSON_SUCCESS,
      data: res,
    });
  } catch (err) {
    dispatch({
      type: GET_UNREAD_MSG_PER_PERSON_ERROR,
      data: err.response,
    });
    toast.error(err.response.data);
  }
};
export const recentConve = () => async (dispatch) => {
  try {
    const res = await http.get(apiEndpoint + "/recent");
    dispatch({
      type: RECENT_CONVERSATION_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: RECENT_CONVERSATION_ERROR,
      data: err.response,
    });
    toast.error(err.response.data);
  }
};
export const unreadMsg = () => async (dispatch) => {
  try {
    const res = await http.get(apiEndpoint + "/unreadMsg");
    dispatch({
      type: GET_UNREAD_MSG_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_UNREAD_MSG_ERROR,
      data: err.response,
    });
    toast.error(err.response.data);
  }
};

export const unblockUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: UNBLOCK_USER_SUCCESS,
      data: user,
    });
  } catch (err) {
    dispatch({
      type: UNBLOCK_USER_ERROR,
      data: err.response.data,
    });
    toast.error(err.response.data);
  }
};
export const getBlockedUsers = () => async (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGES,
  });
  try {
    const res = await http.get(apiEndpoint + "/blockedList");
    dispatch({
      type: GET_BLOCKED_USERS_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_BLOCKED_USERS_ERROR,
      data: err.response.data,
    });
    toast.error(err.response.data);
  }
};
