import { UPLOAD_PHOTO_ERROR, UPLOAD_PHOTO_SUCCESS } from "../action/constants";
const initialState = {
  photo: "",
  loading: true,
};
export default function (state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        photo: data,
        loading: false,
      };
    case UPLOAD_PHOTO_ERROR:
      return {
        ...state,
        error: data,
        loading: false,
      };

    default:
      return state;
  }
}
