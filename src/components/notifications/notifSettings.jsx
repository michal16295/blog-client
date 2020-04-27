import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";
import { setNotifySettings, getSettings } from "../../action/notifications";

const NotificationsSettings = ({
  setNotifySettings,
  getSettings,
  notification: { settings, loading },
}) => {
  const [web, setWeb] = useState({
    comments: false,
    reactions: false,
    groups: false,
    blogs: false,
  });

  const [email, setEmail] = useState({
    comments: false,
    reactions: false,
    groups: false,
    blogs: false,
  });

  useEffect(() => {
    getSettings();
    setWeb({
      comments: settings.web.comments,
      reactions: settings.web.reactions,
      groups: settings.web.groups,
      blogs: settings.web.blogs,
    });
    setEmail({
      comments: settings.email.comments,
      reactions: settings.email.reactions,
      groups: settings.email.groups,
      blogs: settings.email.blogs,
    });
  }, [loading]);

  const onChange = (e, data, col) => {
    if (col === "web") {
      setWeb({
        ...web,
        [data.name]: data.checked,
      });
    } else {
      setEmail({
        ...email,
        [data.name]: data.checked,
      });
    }
  };
  const handleAll = () => {
    setWeb({
      ...web,
      comments: true,
      reactions: true,
      groups: true,
      blogs: true,
    });
    setEmail({
      ...email,
      comments: true,
      reactions: true,
      groups: true,
      blogs: true,
    });
  };
  const onSubmit = (e, col) => {
    e.preventDefault();
    let data = { web, email };
    setNotifySettings(data);
  };

  return (
    <Fragment>
      <h2> Notifications Settings</h2>
      <h3>{loading}</h3>
      <Table celled compact definition>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Web</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Comments</Table.Cell>
            <Table.Cell collapsing>
              <Checkbox
                checked={web.comments}
                name="comments"
                onChange={(e, data) => onChange(e, data, "web")}
                slider
              />
            </Table.Cell>
            <Table.Cell collapsing>
              <Checkbox
                checked={email.comments}
                name="comments"
                onChange={(e, data) => onChange(e, data, "email")}
                slider
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Reactions</Table.Cell>
            <Table.Cell collapsing>
              <Checkbox
                checked={web.reactions}
                name="reactions"
                onChange={(e, data) => onChange(e, data, "web")}
                slider
              />
            </Table.Cell>
            <Table.Cell collapsing>
              <Checkbox
                checked={email.reactions}
                name="reactions"
                onChange={(e, data) => onChange(e, data, "email")}
                slider
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Groups</Table.Cell>
            <Table.Cell collapsing>
              <Checkbox
                checked={web.groups}
                name="groups"
                onChange={(e, data) => onChange(e, data, "web")}
                slider
              />
            </Table.Cell>
            <Table.Cell collapsing>
              <Checkbox
                checked={email.groups}
                name="groups"
                onChange={(e, data) => onChange(e, data, "email")}
                slider
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Blogs</Table.Cell>
            <Table.Cell collapsing>
              <Checkbox
                checked={web.blogs}
                name="blogs"
                onChange={(e, data) => onChange(e, data, "web")}
                slider
              />
            </Table.Cell>
            <Table.Cell collapsing>
              <Checkbox
                checked={email.blogs}
                name="blogs"
                onChange={(e, data) => onChange(e, data, "email")}
                slider
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell>
              <Button
                onClick={(e) => onSubmit(e)}
                type="submit"
                primary
                size="small"
              >
                Submit
              </Button>
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="4">
              <Button onClick={() => handleAll()} floated="right" size="small">
                {" "}
                All
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Fragment>
  );
};

NotificationsSettings.propTypes = {
  auth: PropTypes.object.isRequired,
  setNotifySettings: PropTypes.func.isRequired,
  getSettings: PropTypes.func.isRequired,
  notification: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  notification: state.notification,
});
export default connect(mapStateToProps, {
  setNotifySettings,
  getSettings,
})(NotificationsSettings);
