import {
  CREATE_COMMENT_ERROR,
  CREATE_COMMENT_SUCCESS,
  GET_ALL_COMMENTS_SUCCESS,
  GET_ALL_COMMENTS_ERROR,
  CLEAR_CURRENT_COMMENTS
} from "../action/constants";
const initialState = {
  comment: {},
  comments: [],
  loading: true,
  currentCount: 0,
  AllCount: 0,
  itemsPerPage: 0
};

export default function(state = initialState, action) {
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
        AllCount: data.count
      };
    case CREATE_COMMENT_ERROR:
    case GET_ALL_COMMENTS_ERROR:
      return {
        ...state,
        loading: false
      };
    case GET_ALL_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: state.comments.concat(data[0].data),
        AllCount: data[0].metadata[0].total,
        itemsPerPage: data[0].metadata[0].ITEMS_PER_PAGE,
        currentCount: data[0].data.length,
        loading: false
      };
    case CLEAR_CURRENT_COMMENTS:
      return {
        comments: [],
        loading: true
      };

    default:
      return state;
  }
}
