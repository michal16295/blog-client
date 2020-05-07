import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./users";
import group from "./groups";
import blog from "./blogs";
import reaction from "./reaction";
import comment from "./comments";
import notification from "./notifications";
import chat from "./chat";
import file from "./file";
export default combineReducers({
  auth,
  profile,
  group,
  blog,
  reaction,
  comment,
  notification,
  chat,
  file,
});
