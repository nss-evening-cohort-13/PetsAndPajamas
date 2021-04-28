import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class MyFooter extends React.Component {
  render() {
    return (
        <div className="footer-container">
        <Container className="footer-table">
            <Row>
                <Col>
                    <h3 className="footer-header">Shop</h3>
                    <Link to='/' className="footer-text">Latest Products</Link>
                    <Link to='/dog-store' className="footer-text">Dog Products</Link>
                    <Link to='/cat-store' className="footer-text">Cat Products</Link>
                </Col>
                <Col>
                    <h3 className="footer-header">Contact Us</h3>
                    <div className="footer-contact-div"><i className="far fa-envelope footer-icons"></i><p className="footer-text">hello@petsandpajamas.com</p></div>
                    <div className="footer-contact-div"><i className="fas fa-phone footer-icons"></i><p className="footer-text">(999) 000-9999</p></div>
                </Col>
                <Col>
                    <h3 className="footer-header">Help</h3>
                    <Link to='profile-page' className="footer-text">Account Details</Link>
                </Col>
            </Row>
        </Container>
            <img src="https://i.imgur.com/FpsBGr2.png" alt="Pets and Pajamas logo"></img>
            </div>
    );
  }
}
