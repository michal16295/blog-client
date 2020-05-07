import { UPLOAD_PHOTO_ERROR, UPLOAD_PHOTO_SUCCESS } from "./constants";
import http from "../services/httpService";
import { toast } from "react-toastify";
const apiUrl = "http://localhost:5100";
const apiEndpoint = apiUrl + "/files";

//UPLOAD PHOTO
export const uploadFile = (data) => async (dispatch) => {
  try {
    const res = await http.post(apiEndpoint + "/upload", data);
    dispatch({
      type: UPLOAD_PHOTO_SUCCESS,
    });
    window.location.reload();
  } catch (err) {
    dispatch({
      type: UPLOAD_PHOTO_ERROR,
    });
    console.log(err);
  }
};
