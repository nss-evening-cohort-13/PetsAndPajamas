import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
} from 'reactstrap';

class Sidebar extends Component {
  state = { }

  render() {
    return (
      <>
      <Navbar className="col-md-12 d-none d-md-block sidebar">
          <Nav navbar>
          <div className="sidebar-sticky"></div>
            <NavItem>
              <Link to="/admin-order" className="m-3 nav-link navbar-links nav-font">Orders</Link>
            </NavItem>
            <NavItem>
              <Link to="/admin-products" className="m-3 nav-link navbar-links nav-font">Products</Link>
            </NavItem>
          </Nav>
          </Navbar>
    </>
    );
  }
}

export default withRouter(Sidebar);
