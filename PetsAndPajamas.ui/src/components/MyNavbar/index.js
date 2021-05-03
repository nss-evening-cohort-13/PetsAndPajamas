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
import Auth from '../Auth';

class MyNavbar extends Component {
  state = {
    isOpen: false,
  }

  toggle = () => this.setState({
    isOpen: !this.state.isOpen,
  })

  render() {
    const { realUser } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <div>
        <Navbar expand='md' dark className='navbar justify-content-between'>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <img className='mr-3 navbar-logo' src='https://imgur.com/fmnolhs.jpg' alt='logo'></img>
              </NavItem>
              <NavItem>
                <Link className="mt-1 mr-3 nav-link navbar-links" to='/about'>About</Link>
              </NavItem>
              <Link className="mt-1 mr-3 nav-link navbar-links" to='/'>Home</Link>
              <NavItem>
                <Link className="mt-1 mr-3 nav-link navbar-links" to='/dog-store'>
                  Dogs
                </Link>
              </NavItem>
              <NavItem>
                <Link className="mt-1 mr-3 nav-link navbar-links" to='/cat-store'>
                  Cats
                </Link>
              </NavItem>
              <NavItem>
              {realUser.admin === true && <Link className="mt-1 mr-3 nav-link navbar-links" to='/admin-dashboard'>
                  Admin
                </Link>}
              </NavItem>
            </Nav>
              <Link className="fas fa-shopping-cart fa-3x cart-icon" to='/cart'></Link>
              <p className='mr-3 mt-3 text-light'>Search:</p>
            <SearchInput />
            <Auth />
          </Collapse>
        </Navbar>
      </div>
        </>
    );
  }
}

export default withRouter(MyNavbar);
