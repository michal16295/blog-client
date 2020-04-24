import {
  GROUP_CREATED_SUCCESS,
  GROUP_CREATED_ERROR,
  GET_ALL_GROUPS_ERROR,
  GET_ALL_GROUPS,
  GROUP_DELETE_ERROR,
  GROUP_DELETE_SECCESS,
  GROUP_PROFILE_SUCCESS,
  GROUP_PROFILE_ERROR,
  GROUPS_MEMBERS_SUCCESS,
  GROUPS_MEMBERS_ERROR,
  ADD_MEMBER_ERROR,
  ADD_MEMBER_SUCCESS,
  EDIT_GROUP_ERROR,
  EDIT_GROUP_SUCCESS,
  REMOVE_MEMBER_ERROR,
  REMOVE_MEMBER_SUCCESS,
  CLEAR_CURRENT_GROUP,
} from "../action/constants";
const initialState = {
  group: null,
  groups: [],
  users: [],
  owner: null,
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case CLEAR_CURRENT_GROUP:
      return {
        ...state,
        groups: [],
        group: null,
        loading: true,
        count: 0,
        itemsPerPage: 0,
      };
    case GROUP_CREATED_SUCCESS:
    case GROUP_DELETE_SECCESS:
    case GROUP_PROFILE_SUCCESS:
    case ADD_MEMBER_SUCCESS:
    case EDIT_GROUP_SUCCESS:
    case REMOVE_MEMBER_SUCCESS:
      return {
        ...state,
        group: data,
        loading: false,
      };
    case REMOVE_MEMBER_ERROR:
    case GET_ALL_GROUPS_ERROR:
    case GROUP_CREATED_ERROR:
    case GROUP_DELETE_ERROR:
    case GROUP_PROFILE_ERROR:
    case GROUPS_MEMBERS_ERROR:
    case ADD_MEMBER_ERROR:
    case EDIT_GROUP_ERROR:
      return {
        ...state,
        error: data,
        loading: false,
      };

    case GET_ALL_GROUPS:
      return {
        ...state,
        groups: data.data,
        count: data.metadata[0].total,
        itemsPerPage: data.metadata[0].ITEMS_PER_PAGE,
        loading: false,
      };
    case GROUPS_MEMBERS_SUCCESS:
      return {
        ...state,
        users: data.data,
        count: data.metadata[0].total,
        itemsPerPage: data.metadata[0].ITEMS_PER_PAGE,
        loading: false,
      };

    default:
      return state;
  }
}
