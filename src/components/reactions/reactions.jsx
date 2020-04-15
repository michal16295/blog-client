import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setReaction,
  getCurrentUserReaction,
  deleteReaction,
} from "../../action/reactions";
import "./reactions.scss";
import { Button, Icon, Label, Image } from "semantic-ui-react";
import AllReactions from "../reactions/allReactions";

const Reactions = ({
  setReaction,
  getCurrentUserReaction,
  deleteReaction,
  auth: { user },
  blog: { blog, loading },
  reaction: { reaction, count, AllCount },
}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    page: 1,
    showModal: false,
  });
  const { name, type, page, showModal } = formData;
  useEffect(() => {
    getCurrentUserReaction(blog._id);
    setFormData({
      ...formData,
      name: reaction,
    });
  }, []);

  const handleReaction = (name) => {
    setFormData({
      ...formData,
      name,
    });
    const data = {
      blogId: blog._id,
      name,
      userName: user.userName,
    };
    setReaction(data);
  };
  const handleUnlike = () => {
    setFormData({
      ...formData,
      name: "",
    });
    deleteReaction(blog._id, user.userName);
  };
  const handleModal = () => {
    setFormData({ ...formData, showModal: !showModal });
  };

  return (
    <Fragment>
      {showModal && (
        <AllReactions
          handleModal={handleModal}
          action={true}
          blogId={blog._id}
        />
      )}
      <div className="box col-2">
        {reaction !== "" && reaction !== undefined && !reaction.loading ? (
          name !== "" ? (
            <Button as="div" labelPosition="right">
              <Button icon onClick={() => handleUnlike()}>
                <Image className={"label-reactions " + name} avatar />
                {name}
              </Button>
              <Label onClick={() => handleModal()} as="a" basic pointing="left">
                {AllCount}
              </Label>
            </Button>
          ) : (
            <Button as="div" labelPosition="right">
              <Button icon onClick={() => handleUnlike()}>
                <Image className={"label-reactions " + reaction} avatar />
                {reaction}
              </Button>
              <Label onClick={() => handleModal()} as="a" basic pointing="left">
                {AllCount}
              </Label>
            </Button>
          )
        ) : (
          <Button as="div" labelPosition="right">
            <Button icon>
              <Icon name="heart" />
              Like
            </Button>
            <Label onClick={() => handleModal()} as="a" basic pointing="left">
              {AllCount}
            </Label>
          </Button>
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
  deleteReaction: PropTypes.func,
};
const mapStateToProps = (state) => ({
  reaction: state.reaction,
  auth: state.auth,
  blog: state.blog,
});
export default connect(mapStateToProps, {
  setReaction,
  getCurrentUserReaction,
  deleteReaction,
})(Reactions);
