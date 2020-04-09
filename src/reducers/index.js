import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./users";
import group from "./groups";
import blog from "./blogs";
import reaction from "./reaction";
import comment from "./comments";
export default combineReducers({
  alert,
  auth,
  profile,
  group,
  blog,
  reaction,
  comment
});
