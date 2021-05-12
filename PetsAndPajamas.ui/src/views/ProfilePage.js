import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserSidebar from '../components/UserSidebar';
import ProfileInfo from '../components/ProfileInfo';

class ProfilePage extends Component {
  state = { }

  render() {
    return (
      <>
       <Container fluid>
                <Row>
                    <Col xs={-1} id="sidebar-wrapper">
                      <UserSidebar />
                    </Col>
                    <Col xs={0} id="page-content-wrapper">
      <h1>About You</h1>
      <ProfileInfo user={this.props.user} />
      </Col>
                </Row>
            </Container>
      </>
    );
  }
}

export default ProfilePage;
