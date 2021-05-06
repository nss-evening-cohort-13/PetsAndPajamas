import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

class Orders extends Component {
  state = { }

  render() {
    return (
      <div>
         <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                      <Sidebar />
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                    <h1>Orders</h1>
                    </Col>
                </Row>
            </Container>
      </div>
    );
  }
}

export default Orders;
