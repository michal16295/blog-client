import {
  ALL_USERS_ERROR,
  ALL_USERS_SUCCESS,
  GET_USER,
  GET_USER_ERROR,
  EDIT_ERROR,
  EDIT_SUCCESS,
  CLEAR_CURRENT_USER,
  GET_AVATAR_ERROR,
  GET_AVATAR_SUCCESS,
} from "../action/constants";
const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
  avatars: {},
};
export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case EDIT_SUCCESS:
    case GET_USER:
      return {
        ...state,
        profile: data,
        loading: false,
      };
    case EDIT_ERROR:
    case ALL_USERS_ERROR:
    case GET_USER_ERROR:
    case GET_AVATAR_ERROR:
      return {
        ...state,
        error: data,
        loading: false,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        profiles: data.data,
        count: data.metadata[0].total,
        itemsPerPage: data.metadata[0].ITEMS_PER_PAGE,
        loading: false,
      };
    case GET_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        avatars: { ...state.avatars, [data.userName]: data.avatar },
      };
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        avatar: "",
        loading: true,
      };

    default:
      return state;
  }
}
