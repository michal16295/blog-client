import {
  GET_NOTIFY_SUCCESS,
  GET_NOTIFY_ERROR,
  SET_VIEWED_TRUE,
  SET_SETTINGS_ERROR,
  SET_SETTINGS_SUCCESS,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_ERROR,
  CLEAR_NOTIFY,
} from "../action/constants";
const initialState = {
  notification: {},
  notifications: [],
  loading: true,
  notViewed: 0,
  AllCount: 0,
  itemsPerPage: 0,
  settings: "",
};

export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case CLEAR_NOTIFY:
      return {
        ...state,
        error: "",
        loading: true,
        settings: "",
      };
    case GET_NOTIFY_ERROR:
    case SET_SETTINGS_ERROR:
    case GET_SETTINGS_ERROR:
      return {
        ...state,
        error: data,
        loading: false,
      };
    case GET_NOTIFY_SUCCESS:
      return {
        ...state,
        notViewed: data.notViewed,
        notifications: data.data[0].data,
        AllCount: data.data[0].metadata[0].total,
        loading: false,
      };
    case SET_VIEWED_TRUE:
      return {
        ...state,
        notViewed: data.notViewed,
        loading: false,
      };
    case SET_SETTINGS_SUCCESS:
    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: data,
        loading: false,
      };
    default:
      return state;
  }
}
