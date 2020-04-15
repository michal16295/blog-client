import {
  SET_REACTION_ERROR,
  SET_REACTION_SUCCESS,
  GET_CURRENT_USER_REACTION_ERROR,
  GET_CURRENT_USER_REACTION_SUCCESS,
  CLEAR_CURRENT_REACTION,
  DELETE_REACTION_ERROR,
  DELETE_REACTION_SUCCESS,
  GET_REACTIONS_ERROR,
  GET_REACTIONS_SUCCESS,
  NUM_OF_REACTIONS_SUCCESS,
  NUM_OF_REACTIONS_ERROR,
  CLEAR_REACTIONS,
} from "../action/constants";
const initialState = {
  reaction: "",
  reactions: [],
  loading: true,
  currentCount: 0,
  AllCount: 0,
};

export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case SET_REACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        reaction: data.type,
        AllCount: data.count,
      };
    case GET_CURRENT_USER_REACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        reaction: data,
      };

    case SET_REACTION_ERROR:
    case GET_CURRENT_USER_REACTION_ERROR:
    case DELETE_REACTION_ERROR:
    case GET_REACTIONS_ERROR:
      return {
        ...state,
        reactions: [],
        count: "",
        loading: false,
      };
    case CLEAR_CURRENT_REACTION:
      return {
        ...state,
        reaction: "",
        loading: true,
      };
    case GET_REACTIONS_SUCCESS:
      console.log(data.data[0].data.length);
      return {
        ...state,
        reactions: state.reactions.concat(data.data[0].data),
        AllCount: data.allCount,
        currentCount: data.data[0].data.length,
        itemsPerPage: data.data[0].metadata[0].ITEMS_PER_PAGE,
        loading: false,
      };
    case DELETE_REACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        reaction: "",
        AllCount: data.count,
      };
    case NUM_OF_REACTIONS_SUCCESS:
      return {
        ...state,
        AllCount: data.count,
        itemsPerPage: data.ITEMS_PER_PAGE,
      };
    case CLEAR_REACTIONS:
      return {
        ...state,
        reactions: [],
        currentCount: "",
        loading: true,
      };
    default:
      return state;
  }
}
