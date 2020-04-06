import { SET_ALERT, REMOVE_ALERT } from "./constants";
import { v4 as uuidv4 } from "uuid";
export const setAlert = (msg, alertType) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    data: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, data: id }), 3000);
};
