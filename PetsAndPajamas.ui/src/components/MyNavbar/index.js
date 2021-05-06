import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarBrand
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
            <NavbarBrand>
                <img className='navbar-logo' src='https://i.imgur.com/YWID0CA.png' alt='logo'></img>
              </NavbarBrand>
              <NavItem>
                <Link className="mt-1 mr-3 nav-link navbar-links nav-font" to='/about'>About Us</Link>
              </NavItem>
              <Link className="mt-1 mr-3 nav-link navbar-links nav-font" to='/'>Home</Link>
              <NavItem>
                <Link className="mt-1 mr-3 nav-link navbar-links nav-font" to='/dog-store'>
                  Dogs
                </Link>
              </NavItem>
              <NavItem>
                <Link className="mt-1 mr-3 nav-link navbar-links nav-font" to='/cat-store'>
                  Cats
                </Link>
              </NavItem>
              <NavItem>
              {realUser.admin === true && <Link className="mt-1 mr-3 nav-link navbar-links nav-font" to='/admin-order'>
                  Admin
                </Link>}
                {realUser.admin === false && <Link className="mt-1 mr-3 nav-link navbar-links nav-font" to='/profile-page'>
                Profile
              </Link>}
              </NavItem>
            </Nav>
              <Link className="fas fa-shopping-cart fa-3x cart-icon nav-font" to='/cart'></Link>
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
