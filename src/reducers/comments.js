import {
  CREATE_COMMENT_ERROR,
  CREATE_COMMENT_SUCCESS
} from "../action/constants";
const initialState = {
  comment: {},
  comments: [],
  loading: true,
  userCount: 0,
  AllCount: 0
};

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comment: data.comment,
        AllCount: data.count
      };
    case CREATE_COMMENT_ERROR:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
