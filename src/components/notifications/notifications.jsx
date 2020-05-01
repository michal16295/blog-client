import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Feed, Comment, Header } from "semantic-ui-react";
import { getNotifications } from "../../action/notifications";
import Pagination from "../../common/pagination";
import NotificationItem from "./notificationItem";

const Notifications = ({
  getNotifications,
  notification: { notifications, AllCount, itemsPerPage },
}) => {
  useEffect(() => {
    getNotifications();
  }, []);

  const [currentPage, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
    getNotifications(page);
  };
  return (
    <Fragment>
      <Comment.Group className="container">
        <Header as="h3" dividing>
          Notifications
        </Header>
        <Feed>
          {notifications &&
            notifications.length > 0 &&
            notifications.map((i) => <NotificationItem key={i._id} data={i} />)}
        </Feed>
      </Comment.Group>
      <Pagination
        itemsCount={AllCount}
        currentPage={currentPage}
        onPageChange={(page) => handlePageChange(page)}
        pageSize={itemsPerPage}
      />
    </Fragment>
  );
};
Notifications.propTypes = {
  auth: PropTypes.object.isRequired,
  getNotifications: PropTypes.func.isRequired,
  notification: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  notification: state.notification,
});
export default connect(mapStateToProps, {
  getNotifications,
})(Notifications);
