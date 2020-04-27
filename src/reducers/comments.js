import {
  CREATE_COMMENT_ERROR,
  CREATE_COMMENT_SUCCESS,
  GET_ALL_COMMENTS_SUCCESS,
  GET_ALL_COMMENTS_ERROR,
  CLEAR_CURRENT_COMMENTS,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_ERROR,
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
} from "../action/constants";
const initialState = {
  comment: {},
  comments: [],
  loading: true,
  currentCount: 0,
  AllCount: 0,
  itemsPerPage: 0,
};

export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case CREATE_COMMENT_SUCCESS:
      if (state.comments === undefined) {
        initialState.comments.push(data.newComment);
        state.comments = initialState.comments;
      } else {
        state.comments.unshift(data.newComment);
      }
      return {
        ...state,
        loading: false,
        comment: data.newComment,
        AllCount: data.count,
      };
    case CREATE_COMMENT_ERROR:
    case GET_ALL_COMMENTS_ERROR:
    case EDIT_COMMENT_ERROR:
    case DELETE_COMMENT_ERROR:
      return {
        ...state,
        error: data,
        loading: false,
      };
    case EDIT_COMMENT_SUCCESS:
      return {
        loading: false,
        message: data,
        AllCount: data.count,
      };
    case GET_ALL_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: state.comments.concat(data[0].data),
        AllCount: data[0].metadata[0].total,
        itemsPerPage: data[0].metadata[0].ITEMS_PER_PAGE,
        currentCount: data[0].data.length,
        loading: false,
      };
    case DELETE_COMMENT_SUCCESS:
      const index = state.comments.findIndex(
        (obj) => obj._id === data.comment._id
      );
      state.comments = [
        ...state.comments.slice(0, index),
        ...state.comments.slice(index + 1),
      ];
      return {
        ...state,
        loading: false,
        AllCount: data.count,
      };
    case CLEAR_CURRENT_COMMENTS:
      return {
        comments: [],
        loading: true,
      };

    default:
      return state;
  }
}
