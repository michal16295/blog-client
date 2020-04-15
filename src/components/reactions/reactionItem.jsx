import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Comment } from "semantic-ui-react";
import { getUserAvatar } from "../../action/users";
import "./reactions.scss";

const ReactionItem = ({
  getUserAvatar,
  data,
  profile: { loading, avatars },
}) => {
  useEffect(() => {
    getUserAvatar(data.userName);
  }, []);

  return (
    <Comment>
      <hr className="s" />
      {!loading && <Comment.Avatar as="a" src={avatars[data.userName]} />}
      <Comment.Content>
        <Comment.Author>{data.userName}</Comment.Author>
      </Comment.Content>
    </Comment>
  );
};
ReactionItem.propTypes = {
  profile: PropTypes.object,
  data: PropTypes.object,
  getUserAvatar: PropTypes.func,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserAvatar })(ReactionItem);
