import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import userData from '../../helpers/data/userData';

class ProfileInfo extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    userData.getUserByUid(this.props.user.uid).then((response) => {
      this.setState({
        user: response[0]
      });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <>
      <Card style={{ width: '50rem' }}>
  <Card.Body>
    <Card.Title>{user.firstName} {user.lastName}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>
      </>
    );
  }
}

export default ProfileInfo;
