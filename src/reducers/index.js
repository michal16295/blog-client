import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./users";
import group from "./groups";
import blog from "./blogs";
export default combineReducers({
  alert,
  auth,
  profile,
  group,
  blog
});
