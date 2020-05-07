import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import { uploadFile } from "../action/file";
import avatar from "../img/avatar.png";
import Modal from "react-bootstrap/Modal";
import { Button, Input, Icon, Image } from "semantic-ui-react";
import "./auth.css";

const UploadFiles = ({ uploadFile, uploadPhoto, auth: { user } }) => {
  const [prev, setPrev] = useState(null);
  const [file, setFile] = useState("");
  const [show, handleShow] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file);
    uploadFile(formData);
  };

  const onDrop = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPrev(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal show={show} onHide={uploadPhoto}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="file">
          {prev ? (
            <Image wrapped size="medium" src={prev} className="image" />
          ) : (
            <Image wrapped size="medium" src={user.avatar} className="image" />
          )}
          <h1></h1>
          <div className="upload-fileBtn-wrapper">
            <button class="fileBtn">
              <i class="fas fa-edit"></i>
            </button>
            <input
              className="file-input"
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => onDrop(e)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button basic color="red" variant="secondary" onClick={uploadPhoto}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button onClick={(e) => onSubmit(e)} color="green" inverted>
          <Icon name="checkmark" /> Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UploadFiles.propTypes = {
  auth: PropTypes.object,
  uploadFile: PropTypes.func,
  uploadPhoto: PropTypes.func,
  auth: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { uploadFile })(UploadFiles);
