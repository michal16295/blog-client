import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Feed } from "semantic-ui-react";
import { getUserAvatar } from "../../action/users";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const NotificationItem = ({
  data,
  profile: { loading, avatars },
  getUserAvatar,
}) => {
  useEffect(() => {
    getUserAvatar(data.from);
  }, []);

  return (
    <Feed.Event>
      <Feed.Label>{!loading && <img src={avatars[data.from]} />}</Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Link style={{ color: "blue" }} to={`/profile/${data.from}`}>
            {data.from}
          </Link>{" "}
        </Feed.Summary>
        <Link to={`/${data.type}/${data.link}`}>
          <Feed.Summary>
            {data.content + " - " + data.title}
            <Feed.Date>
              <Moment fromNow>{data.date}</Moment>
            </Feed.Date>
          </Feed.Summary>
          <Feed.Meta></Feed.Meta>
        </Link>
      </Feed.Content>
    </Feed.Event>
  );
};
NotificationItem.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
  getUserAvatar: PropTypes.func,
  data: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserAvatar })(NotificationItem);
