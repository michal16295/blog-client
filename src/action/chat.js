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
  BLOCK_USER_ERROR,
  BLOCK_USER_SUCCESS,
  UNBLOCK_USER_ERROR,
  UNBLOCK_USER_SUCCESS,
  CLEAR_UNREAD,
} from "./constants";
import http from "../services/httpService";
import { setAlert } from "./alert";

const apiUrl = "http://localhost:5000";
const apiEndpoint = apiUrl + "/chat";

export const sendMsg = (data) => async (dispatch) => {
  try {
    const res = await http.post(apiEndpoint + "/send", data);
    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      data: res.data,
    });
    dispatch(recentConve());
  } catch (err) {
    dispatch({
      type: SEND_MESSAGE_ERROR,
      error: err.response,
    });
  }
};
export const getMsgs = (reciever, page) => async (dispatch) => {
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
  } catch (err) {
    dispatch({
      type: GET_MESSAGES_ERROR,
      error: err.response,
    });
  }
};
export const getNumUnreadMsgs = (reciever) => async (dispatch) => {
  try {
    let res = await http.get(apiEndpoint + "/unreadMsgs/" + reciever);
    res = {
      reciever,
      notViewed: res.data.notViewed,
    };
    dispatch({
      type: GET_UNREAD_MSG_PER_PERSON_SUCCESS,
      data: res,
    });
  } catch (err) {
    dispatch({
      type: GET_UNREAD_MSG_PER_PERSON_ERROR,
      error: err.response,
    });
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
      error: err.response,
    });
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
      error: err.response,
    });
  }
};
export const blockUser = (userName) => async (dispatch) => {
  try {
    const res = await http.put(apiEndpoint + "/block/" + userName);
    dispatch({
      type: BLOCK_USER_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOCK_USER_ERROR,
    });
  }
};
export const unblockUser = (userName) => async (dispatch) => {
  try {
    const res = await http.put(apiEndpoint + "/unblock/" + userName);
    console.log(res);
    dispatch({
      type: UNBLOCK_USER_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: UNBLOCK_USER_ERROR,
    });
  }
};
