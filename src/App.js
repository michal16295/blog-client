import React, { Fragment, useEffect } from "react";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import NavBar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/alert";
import http from "./services/httpService";
import { loadUser } from "./action/auth";
import AllUsers from "./components/users/AllUsers";
import CurrentUser from "./components/users/currentUser";
import EditUser from "./components/users/editProfile";
import ChangePass from "./components/users/changePassword";
import Profilies from "./components/users/AllUsers";
import UserProfile from "./components/profile/userProfile";
import Groups from "./components/groups/groups";
import CreateGroup from "./components/groups/createGroup";
import CreateBlog from "./components/blogs/createEditBlog";
import GroupProfile from "./components/groupProfile/groupProfile";
import Blogs from "./components/blogs/blogs";
import UserBlogs from "./components/blogs/usersBlogs";
import BlogProfile from "./components/blogs/blogProfile";
import NotFound from "./common/notFonud/notFound";
import "./App.css";

if (localStorage.token) {
  http.setJwt(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={Landing}></Route>
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/currentUser" component={CurrentUser}></Route>
              <Route exact path="/edit" component={EditUser}></Route>
              <Route exact path="/changePass" component={ChangePass}></Route>
              <Route exact path="/profiles" component={Profilies}></Route>
              <Route
                exact
                path="/profile/:userName"
                component={UserProfile}
              ></Route>
              <Route exact path="/groups" component={Groups}></Route>
              <Route exact path="/group/:id" component={GroupProfile}></Route>
              <Route exact path="/createGroup" component={CreateGroup}></Route>
              <Route exact path="/blogs" component={Blogs}></Route>
              <Route
                exact
                path="/createBlog/:edit"
                component={CreateBlog}
              ></Route>
              <Route exact path="/AllUsers" component={AllUsers}></Route>
              <Route
                exact
                path="/blogs/:userName/:currentUser"
                component={UserBlogs}
              ></Route>
              <Route exact path="/blog/:id" component={BlogProfile}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
