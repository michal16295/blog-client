import {
  CREATE_BLOG_ERROR,
  CREATE_BLOG_SUCCESS,
  GET_USERS_BLOGS_SUCCESS,
  GET_USERS_BLOGS_ERROR,
  CLEAR_CURRENT_BLOG,
  DELETE_POST_ERROR,
  DELETE_POST_SUCCESS,
  GET_POST_ERROR,
  GET_POST_SUCCESS,
  EDIT_BLOG_ERROR,
  EDIT_BLOG_SUCCESS,
} from "./constants";
import http from "../services/httpService";
import { toast } from "react-toastify";
const apiUrl = "http://localhost:5000";
const apiEndpoint = apiUrl + "/blogs";

//CREATE BLOG
export const createBlog = (blogData) => async (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_BLOG,
  });
  try {
    const res = await http.post(apiEndpoint + "/create", blogData);
    dispatch({
      type: CREATE_BLOG_SUCCESS,
      data: res.data,
    });
    toast.success("Post Added Successfully");
    setTimeout(() => {
      window.location = "/blogs";
    }, 2000);
  } catch (err) {
    dispatch({
      type: CREATE_BLOG_ERROR,
    });
    toast.error(err.response.data);
  }
};
//GET USERS BLOGS
export const getUsersBlogs = (page, search, userName) => async (dispatch) => {
  if (search === "")
    dispatch({
      type: CLEAR_CURRENT_BLOG,
    });
  try {
    const res = await http.get(
      apiEndpoint + "/" + page + "/" + userName + "?search=" + search
    );
    dispatch({
      type: GET_USERS_BLOGS_SUCCESS,
      data: res.data[0],
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_BLOGS_ERROR,
      data: err.response.data,
    });
    toast.error(err.response.data);
  }
};
//MY BLOGS
export const myBlogs = (page, search) => async (dispatch) => {
  if (search === "") dispatch(clearCurrent());
  try {
    const res = await http.get(apiEndpoint + "/" + page + "?search=" + search);
    dispatch({
      type: GET_USERS_BLOGS_SUCCESS,
      data: res.data[0],
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_BLOGS_ERROR,
      data: err.response.data,
    });
    toast.error(err.response.data);
  }
};
//ALL BLOGS
export const allBlogs = (page, search) => async (dispatch) => {
  if (search === "")
    dispatch({
      type: CLEAR_CURRENT_BLOG,
    });
  try {
    let params = { search };
    const res = await http.get(apiEndpoint + "/all/" + page, { params });
    dispatch({
      type: GET_USERS_BLOGS_SUCCESS,
      data: res.data[0],
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_BLOGS_ERROR,
      data: err.response.data,
    });
    toast.error(err.response.data);
  }
};
//DELETE POST
export const deletePost = (blogId) => async (dispatch) => {
  try {
    const res = await http.delete(apiEndpoint + "/remove/" + blogId);
    dispatch({
      type: DELETE_POST_SUCCESS,
      data: res.data,
    });
    toast.success(res.data);
    setTimeout(() => {
      window.location = "/blogs";
    }, 2000);
  } catch (err) {
    dispatch({
      type: DELETE_POST_ERROR,
    });
    toast.error(err.response.data);
  }
};
//GET POST BY ID
export const getPost = (postId) => async (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_BLOG,
  });
  try {
    const res = await http.get(apiEndpoint + "/getPost/" + postId);
    dispatch({
      type: GET_POST_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_POST_ERROR,
      data: err.response,
    });
    if (err.response.status === 404) window.location = "/notFound";
  }
};

//EDIT BLOG
export const editBlog = (blogData) => async (dispatch) => {
  try {
    const res = await http.put(apiEndpoint + "/edit/", blogData);
    dispatch({
      type: EDIT_BLOG_SUCCESS,
      data: res.data,
    });
    toast.success(res.data);
    setTimeout(() => {
      window.location = `/blog/${blogData.id}`;
    }, 2000);
  } catch (err) {
    dispatch({
      type: EDIT_BLOG_ERROR,
    });
    toast.error(err.response.data);
  }
};

export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT_BLOG,
  };
};
