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
      <Card style={{ margin: 'auto', width: '50rem' }}>
  <Card.Body>
  <div className="d-flex column-wrap justify-content-around">
    <div>
    <Card.Title>{user.firstName} {user.lastName}</Card.Title>
    <img src={this.props.user.photoURL} alt={user.firstName + user.lastName}></img>
    </div>
      <div>
      <p>Email: {user.emailAddress}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address}</p>
      <p>{user.city}, {user.state}</p>
      <p>{user.zipCode}</p>
      <p>{user.country}</p>
      </div>
      </div>
  </Card.Body>
</Card>
      </>
    );
  }
}

export default ProfileInfo;
