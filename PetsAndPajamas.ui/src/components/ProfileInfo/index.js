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

  formatPhoneNumber(phoneNumberString) {
    const cleaned = (`${phoneNumberString}`).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return null;
  }

  render() {
    const { user } = this.state;
    return (
      <>
      <Card className="user-profile-card">
  <Card.Body>
  <div className="d-flex column-wrap justify-content-around">
    <div>
    <Card.Title>{user.firstName} {user.lastName}</Card.Title>
    <img src={this.props.user.photoURL} alt={user.firstName + user.lastName}></img>
    </div>
      <div>
      <p>Email: {user.emailAddress}</p>
      <p>Phone: {this.formatPhoneNumber(user.phone)}</p>
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
