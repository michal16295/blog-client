import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setReaction,
  getCurrentUserReaction,
  deleteReaction
} from "../../action/reactions";
import "./reactions.scss";

const Reactions = ({
  setReaction,
  getCurrentUserReaction,
  deleteReaction,

  auth: { user },
  blog: { blog, loading },
  reaction: { reaction, count }
}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    page: 1
  });
  const { name, type, page } = formData;
  useEffect(() => {
    getCurrentUserReaction(blog._id);
    setFormData({
      ...formData,
      name: reaction
    });
  }, []);

  const handleReaction = name => {
    setFormData({
      ...formData,
      name
    });
    const data = {
      blogId: blog._id,
      name,
      userName: user.userName
    };
    setReaction(data);
  };
  const handleUnlike = () => {
    setFormData({
      ...formData,
      name: ""
    });
    deleteReaction(blog._id, user.userName);
  };

  return (
    <Fragment>
      <div className="box col-1">
        {reaction !== "" && reaction !== undefined && !reaction.loading ? (
          name !== "" ? (
            <button
              onClick={() => handleUnlike()}
              className={"label-reactions " + name}
            >
              {name}
            </button>
          ) : (
            <button
              onClick={() => handleUnlike()}
              className={"label-reactions " + reaction}
            >
              {reaction}
            </button>
          )
        ) : (
          <button
            style={{ outline: "none" }}
            className="w3-button w3-theme-d2 w3-margin-bottom pull-right"
          >
            <i className="fa fa-thumbs-up"></i>Like
          </button>
        )}

        <div className="toolbox"></div>
        <label className="overlay" htmlFor="like"></label>
        <button
          onClick={() => handleReaction("like")}
          className="reaction-like"
        >
          <span className="legend-reaction">Like</span>
        </button>
        <button
          onClick={() => handleReaction("love")}
          className="reaction-love"
        >
          <span className="legend-reaction">Love</span>
        </button>
        <button
          onClick={() => handleReaction("haha")}
          className="reaction-haha"
        >
          <span className="legend-reaction">Haha</span>
        </button>
        <button onClick={() => handleReaction("wow")} className="reaction-wow">
          <span className="legend-reaction">Wow</span>
        </button>
        <button onClick={() => handleReaction("sad")} className="reaction-sad">
          <span className="legend-reaction">Sad</span>
        </button>
        <button
          onClick={() => handleReaction("angry")}
          className="reaction-angry"
        >
          <span className="legend-reaction">Angry</span>
        </button>
      </div>
    </Fragment>
  );
};
Reactions.propTypes = {
  reaction: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  setReaction: PropTypes.func,
  getCurrentUserReaction: PropTypes.func,
  deleteReaction: PropTypes.func
};
const mapStateToProps = state => ({
  reaction: state.reaction,
  auth: state.auth,
  blog: state.blog
});
export default connect(mapStateToProps, {
  setReaction,
  getCurrentUserReaction,
  deleteReaction
})(Reactions);
