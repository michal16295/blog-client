import {
  GET_NOTIFY_SUCCESS,
  GET_NOTIFY_ERROR,
  SET_VIEWED_TRUE,
} from "../action/constants";
const initialState = {
  notification: {},
  notifications: [],
  loading: true,
  notViewed: 0,
  AllCount: 0,
  itemsPerPage: 0,
};

export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case GET_NOTIFY_ERROR:
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

    default:
      return state;
  }
}
