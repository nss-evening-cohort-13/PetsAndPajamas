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
      <div>
      <Navbar className="col-md-12 d-none d-md-block bg-light sidebar">
          <Nav navbar>
          <div className="sidebar-sticky"></div>
            <NavItem>
              <Link to="/admin-order">Orders</Link>
            </NavItem>
            <NavItem>
              <Link to="/admin-products">Products</Link>
            </NavItem>
          </Nav>
          </Navbar>
    </div>
    );
  }
}

export default withRouter(Sidebar);
