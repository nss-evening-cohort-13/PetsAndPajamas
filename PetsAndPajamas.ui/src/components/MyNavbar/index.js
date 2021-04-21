import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';

class MyNavbar extends Component {
  state = {
    isOpen: false,
  }

  toggle = () => this.setState({
    isOpen: !this.state.isOpen,
  })

  render() {
    const { isOpen } = this.state;

    return (
      <>
        <div>
        <Navbar color='dark' dark expand='md' className='navbar justify-content-between'>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <Link className="nav-link" to='/about'>About</Link>
              </NavItem>
              <Link className="nav-link" to='/'>Home</Link>
              <NavItem>
                <Link className="nav-link" to='/dog-store'>
                  Dogs
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to='/cat-store'>
                  Cats
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
        </>
    );
  }
}

export default withRouter(MyNavbar);
