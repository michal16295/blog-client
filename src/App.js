import React, { Fragment, useEffect } from "react";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import NavBar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import http from "./services/httpService";
import { loadUser } from "./action/auth";
import AllUsers from "./components/users/AllUsers";
import EditUser from "./components/users/currentUser/editProfile";
import ChangePass from "./components/users/currentUser/changePassword";
import Profilies from "./components/users/AllUsers";
import UserProfile from "./components/users/profile/userProfile";
import Groups from "./components/groups/groups";
import CreateGroup from "./components/groups/createGroup";
import CreateBlog from "./components/blogs/createEditBlog";
import GroupProfile from "./components/groups/groupProfile/groupProfile";
import Blogs from "./components/blogs/blogs";
import UserBlogs from "./components/blogs/usersBlogs";
import BlogProfile from "./components/blogs/blogProfile";
import NotFound from "./common/notFonud/notFound";
import Notifications from "./components/notifications/notifications";
import Chat from "./components/chat/chat";
import SideBar from "./components/users/currentUser/sideBar";
import UserGroups from "./components/users/profile/userGroups";
import BlockedUsers from "./components/users/currentUser/blockedUsers";
import NotificationsSettings from "./components/notifications/notifSettings";
import ChatSocketServer from "./services/socketService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

if (localStorage.token) {
  http.setJwt(localStorage.token);
}
const App = () => {
  useEffect(() => {
    ChatSocketServer.eventEmitter.on(
      "user-notification-response",
      handleNotifications
    );
    store.dispatch(loadUser());
  }, []);

  const handleNotifications = (data) => {
    toast(data.from + " " + data.content);
  };
  const sideBarPages = () => {
    return (
      <Fragment>
        <div className="page-wrapper chiller-theme toggled">
          <SideBar />
          <Switch>
            <main className="page-content">
              <div className="container-fluid">
                <Route exact path="/edit" component={EditUser}></Route>
                <Route exact path="/changePass" component={ChangePass}></Route>
                <Route exact path="/chat" component={Chat}></Route>
                <Route
                  exact
                  path="/notifications"
                  component={Notifications}
                ></Route>
                <section className="container">
                  <Route
                    exact
                    path="/userGroups/:userName"
                    component={UserGroups}
                  ></Route>
                  <Route
                    exact
                    path="/blockedUsers"
                    component={BlockedUsers}
                  ></Route>
                  <Route
                    exact
                    path="/settings/notifications"
                    component={NotificationsSettings}
                  ></Route>
                </section>
              </div>
            </main>
          </Switch>
        </div>
      </Fragment>
    );
  };
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />

          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
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

            <Route component={sideBarPages}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </Fragment>
      </Router>
      <ToastContainer />
    </Provider>
  );
};

export default App;
