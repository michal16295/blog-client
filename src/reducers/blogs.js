import {
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_ERROR,
  GET_USERS_BLOGS_SUCCESS,
  GET_USERS_BLOGS_ERROR,
  CLEAR_CURRENT_BLOG,
  DELETE_POST_ERROR,
  DELETE_POST_SUCCESS,
  GET_POST_ERROR,
  GET_POST_SUCCESS,
  EDIT_BLOG_ERROR,
  EDIT_BLOG_SUCCESS
} from "../action/constants";
const initialState = {
  blog: null,
  blogs: [],
  users: [],
  groups: [],
  tags: [],
  loading: true,

  error: ""
};
export default function(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case CREATE_BLOG_SUCCESS:
    case DELETE_POST_SUCCESS:
    case EDIT_BLOG_SUCCESS:
      return {
        ...state,
        blog: data,
        loading: false
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        blog: data.blog,
        loading: false,
        users: data.users,
        groups: data.groups
      };
    case CREATE_BLOG_ERROR:
    case GET_USERS_BLOGS_ERROR:
    case DELETE_POST_ERROR:
    case GET_POST_ERROR:
    case EDIT_BLOG_ERROR:
      return {
        ...state,
        error: data,
        loading: false
      };
    case GET_USERS_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: data.data,
        count: data.metadata[0].total,
        itemsPerPage: data.metadata[0].ITEMS_PER_PAGE,
        loading: false
      };
    case CLEAR_CURRENT_BLOG:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
