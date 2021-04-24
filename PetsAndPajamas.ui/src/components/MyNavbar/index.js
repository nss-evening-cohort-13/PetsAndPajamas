import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import SearchInput from '../SearchInput';

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
        <Navbar expand='md' dark className='navbar justify-content-between'>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <img className='mr-5 navbar-logo' src='https://imgur.com/bApYAR0.jpg' alt='logo'></img>
              </NavItem>
              <NavItem>
                <Link className="mr-3 nav-link" to='/about'>About</Link>
              </NavItem>
              <Link className="mr-3 nav-link" to='/'>Home</Link>
              <NavItem>
                <Link className="mr-3 nav-link" to='/dog-store'>
                  Dogs
                </Link>
              </NavItem>
              <NavItem>
                <Link className="mr-3 nav-link" to='/cat-store'>
                  Cats
                </Link>
              </NavItem>
            </Nav>
            <p className='mr-2 mt-3 text-light'>Search:</p>
            <SearchInput />
          </Collapse>
        </Navbar>
      </div>
        </>
    );
  }
}

export default withRouter(MyNavbar);
