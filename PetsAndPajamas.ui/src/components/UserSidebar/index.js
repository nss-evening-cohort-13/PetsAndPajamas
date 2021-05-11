import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
} from 'reactstrap';

class UserSidebar extends Component {
  state = { }

  render() {
    return (
      <>
      <Navbar className="col-md-12 d-none d-md-block sidebar">
          <Nav navbar>
          <div className="sidebar-sticky"></div>
            <NavItem>
              <Link to="/profile-page" className="m-3 nav-link navbar-links nav-font">About You</Link>
            </NavItem>
            <NavItem>
              <Link to="/order-history" className="m-3 nav-link navbar-links nav-font">Order History</Link>
            </NavItem>
          </Nav>
          </Navbar>
    </>
    );
  }
}

export default withRouter(UserSidebar);
