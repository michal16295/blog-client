import {
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  GET_MESSAGES_ERROR,
  GET_MESSAGES_SUCCESS,
  CLEAR_MESSAGES,
  RECENT_CONVERSATION_SUCCESS,
  RECENT_CONVERSATION_ERROR,
  GET_UNREAD_MSG_ERROR,
  GET_UNREAD_MSG_SUCCESS,
  GET_UNREAD_MSG_PER_PERSON_ERROR,
  GET_UNREAD_MSG_PER_PERSON_SUCCESS,
  BLOCK_USER_SUCCESS,
  BLOCK_USER_ERROR,
  UNBLOCK_USER_ERROR,
  UNBLOCK_USER_SUCCESS,
  GET_BLOCKED_USERS_ERROR,
  GET_BLOCKED_USERS_SUCCESS,
} from "../action/constants";
const initialState = {
  message: {},
  messages: [],
  recentConvo: [],
  loading: true,
  notViewed: 0,
  AllCount: 0,
  itemsPerPage: 0,
  notViewedPerUser: {},
  error: "",
  users: [],
};

export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case SEND_MESSAGE_ERROR:
    case GET_MESSAGES_ERROR:
    case RECENT_CONVERSATION_ERROR:
    case GET_UNREAD_MSG_ERROR:
    case GET_UNREAD_MSG_PER_PERSON_ERROR:
    case BLOCK_USER_ERROR:
    case UNBLOCK_USER_ERROR:
    case GET_BLOCKED_USERS_ERROR:
      console.log(data);
      return {
        ...state,
        error: data,
        loading: false,
      };
    case SEND_MESSAGE_SUCCESS:
      if (state.messages === undefined) {
        initialState.messages.push(data);
        state.messages = initialState.messages;
      } else {
        state.messages.push(data);
      }
      return {
        ...state,
        message: data,
        loading: false,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: data[0].data,
        AllCount: data[0].metadata[0].total,
        loading: false,
      };
    case RECENT_CONVERSATION_SUCCESS:
      return {
        ...state,
        recentConvo: data[0].data,
        AllCount: data[0].metadata[0].total,
        loading: false,
      };
    case GET_UNREAD_MSG_SUCCESS:
      return {
        ...state,
        loading: false,
        notViewed: data.count,
      };
    case GET_UNREAD_MSG_PER_PERSON_SUCCESS:
      return {
        ...state,
        loading: false,
        notViewedPerUser: {
          ...state.notViewedPerUser,
          [data.reciever]: data.notViewed,
        },
      };
    case BLOCK_USER_SUCCESS:
    case UNBLOCK_USER_SUCCESS:
      const index = state.users.findIndex((obj) => obj.userName === data.user);
      state.users = [
        ...state.users.slice(0, index),
        ...state.users.slice(index + 1),
      ];
      return {
        ...state,
        loading: false,
        res: data,
      };
    case GET_BLOCKED_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: data,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        loading: true,
        messages: [],
        error: "",
        res: "",
        users: [],
      };

    default:
      return state;
  }
}
