import {
  SET_REACTION_ERROR,
  SET_REACTION_SUCCESS,
  GET_CURRENT_USER_REACTION_ERROR,
  GET_CURRENT_USER_REACTION_SUCCESS,
  CLEAR_CURRENT_REACTION,
  DELETE_REACTION_ERROR,
  DELETE_REACTION_SUCCESS
} from "../action/constants";
const initialState = {
  reaction: "",
  loading: true
};

export default function(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case SET_REACTION_SUCCESS:
    case GET_CURRENT_USER_REACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        reaction: data
      };

    case SET_REACTION_ERROR:
    case GET_CURRENT_USER_REACTION_ERROR:
    case DELETE_REACTION_ERROR:
      return {
        ...state,
        loading: false
      };
    case CLEAR_CURRENT_REACTION:
      return {
        ...state,
        reaction: "",
        loading: true
      };
    case DELETE_REACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        reaction: ""
      };
    default:
      return state;
  }
}
