import {
  GROUP_CREATED_ERROR,
  GROUP_CREATED_SUCCESS,
  GET_ALL_GROUPS,
  GET_ALL_GROUPS_ERROR,
  GROUP_DELETE_ERROR,
  GROUP_DELETE_SECCESS,
  GROUP_PROFILE_SUCCESS,
  GROUP_PROFILE_ERROR,
  GROUPS_MEMBERS_ERROR,
  GROUPS_MEMBERS_SUCCESS,
  ADD_MEMBER_ERROR,
  ADD_MEMBER_SUCCESS,
  EDIT_GROUP_SUCCESS,
  EDIT_GROUP_ERROR,
  REMOVE_MEMBER_ERROR,
  REMOVE_MEMBER_SUCCESS,
  CLEAR_CURRENT_GROUP
} from "./constants";
import http from "../services/httpService";
import { setAlert } from "./alert";

const apiUrl = "http://localhost:5000";
const apiEndpoint = apiUrl + "/groups";

//CREATE GROUP
export const createGroup = groupData => async dispatch => {
  try {
    const res = await http.post(apiEndpoint + "/create", groupData);
    dispatch({
      type: GROUP_CREATED_SUCCESS,
      data: res.data
    });
    window.location = "/groups";
  } catch (err) {
    dispatch(setAlert(err.response.data, "danger"));
    dispatch({
      type: GROUP_CREATED_ERROR
    });
  }
};
//GET ALL GROUPS
export const getGroups = (page, search) => async dispatch => {
  if (search === "") dispatch(clearCurrent());
  try {
    let res = await http.get(
      apiEndpoint + "/all/" + page + "?search=" + search
    );
    dispatch({
      type: GET_ALL_GROUPS,
      data: res.data[0]
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_GROUPS_ERROR
    });
  }
};
//DELETE GROUP
export const groupDelete = groupId => async dispatch => {
  try {
    const res = await http.delete(apiEndpoint + "/delete/" + groupId);
    dispatch({
      type: GROUP_DELETE_SECCESS,
      data: res.data
    });
    window.location = "/groups";
  } catch (err) {
    dispatch(setAlert(err.response.data, "danger"));
    dispatch({
      type: GROUP_DELETE_ERROR
    });
  }
};
//USERS GROUPS
export const getUsersGroups = (page, search, userName) => async dispatch => {
  if (search === "") dispatch(clearCurrent());
  try {
    let res = await http.get(
      apiEndpoint + "/all/" + page + "/" + userName + "?search=" + search
    );
    dispatch({
      type: GET_ALL_GROUPS,
      data: res.data[0]
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_GROUPS_ERROR
    });
  }
};
//GET SINGLE GROUP
export const getGroup = id => async dispatch => {
  dispatch(clearCurrent());
  try {
    const res = await http.get(apiEndpoint + "/" + id);
    dispatch({
      type: GROUP_PROFILE_SUCCESS,
      data: res.data
    });
  } catch (err) {
    dispatch({
      type: GROUP_PROFILE_ERROR,
      data: err
    });
    if (err.response.status === 404) window.location = "/notFound";
  }
};
//GET GROUPS MEMBERS
export const getGroupMembers = (page, search, groupId) => async dispatch => {
  try {
    let res = await http.get(
      apiEndpoint + "/members/" + page + "/" + groupId + "?search=" + search
    );
    dispatch({
      type: GROUPS_MEMBERS_SUCCESS,
      data: res.data[0]
    });
  } catch (err) {
    dispatch({
      type: GROUPS_MEMBERS_ERROR
    });
  }
};
//ADD MEMBER
export const addMember = (member, groupId) => async dispatch => {
  try {
    const res = await http.post(
      apiEndpoint + "/addMember/" + groupId + "/" + member
    );
    dispatch({
      type: ADD_MEMBER_SUCCESS,
      data: res.data
    });
    dispatch(setAlert(res.data, "success"));
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (err) {
    dispatch({
      type: ADD_MEMBER_ERROR,
      data: err.response
    });
    dispatch(setAlert(err.response.data, "danger"));
  }
};
//EDIT GROUP
export const editGroup = group => async dispatch => {
  try {
    const res = await http.put(apiEndpoint + "/edit", group);
    dispatch({
      type: EDIT_GROUP_SUCCESS,
      data: res.data
    });
    dispatch(setAlert(res.data, "success"));
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (err) {
    dispatch({
      type: EDIT_GROUP_ERROR,
      data: err.response
    });
    dispatch(setAlert(err.response.data, "danger"));
  }
};
//REMOVE MEMBER
export const removeMember = (groupId, member) => async dispatch => {
  try {
    const res = await http.delete(
      apiEndpoint + "/removeMember/" + groupId + "/" + member
    );
    dispatch({
      type: REMOVE_MEMBER_SUCCESS,
      data: res.data
    });
    dispatch(setAlert(res.data, "success"));
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (err) {
    dispatch({
      type: REMOVE_MEMBER_ERROR,
      data: err.response
    });
    dispatch(setAlert(err.response.data, "danger"));
  }
};
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT_GROUP
  };
};
