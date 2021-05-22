import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Card, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import Sidebar from '../components/Sidebar';
import ShipQueue from '../components/ShipQueue';
import pajamaOrderData from '../helpers/data/pajamaOrderData';
import PastOrders from '../components/PastOrders';

class Orders extends Component {
  state = {
    pajamaOrders: [],
    currentMonthOrders: []
  }

  componentDidMount() {
    this.getCompletedPajamaOrders();
    this.getCurrentMonthPajamaOrders();
  }

  getCompletedPajamaOrders = () => {
    pajamaOrderData.getCompletedPajamaOrders().then((response) => {
      this.setState({
        pajamaOrders: response
      });
    });
  }

  getCurrentMonthPajamaOrders = () => {
    pajamaOrderData.getCurrentMonthPajamaOrders().then((response) => {
      this.setState({
        currentMonthOrders: response
      });
    });
  }

  totalSales = () => {
    let total = 0;
    this.state.pajamaOrders.forEach((order) => {
      total += (order.quantity * order.pajama.price);
    });
    return total.toFixed(2);
  }

  avgPerItem = () => {
    let total = 0;
    let totalQuantity = 0;
    this.state.pajamaOrders.forEach((order) => {
      total += (order.quantity * order.pajama.price);
      totalQuantity += order.quantity;
    });
    const average = total / totalQuantity;
    return average.toFixed(2);
  }

  monthlySales = () => {
    let total = 0;
    this.state.currentMonthOrders.forEach((order) => {
      total += (order.quantity * order.pajama.price);
    });
    return total.toFixed(2);
  }

  render() {
    return (
      <div className="admin-orders-page">
         <Container fluid>
                <Row>
                    <Col xs={-1} id="sidebar-wrapper">
                      <Sidebar />
                    </Col>
                    <Col xs={0} id="page-content-wrapper">
                      <div className="d-flex col-wrap justify-content-around">
                    <div className="w-25 m-3">
        <Card className="dashboard-card total-sales-card">
          <CardBody>
        <CardTitle className="dashboard-title mt-2">Total Sales</CardTitle>
        <CardSubtitle className="large-reporting">${this.totalSales()}</CardSubtitle>
        <div className="d-flex row-wrap justify-content-center">
          <div className="m-3">
        <CardSubtitle className="mb-2 dashboard-title mt-3">This Month</CardSubtitle>
        <CardSubtitle className="small-reporting">${this.monthlySales()}</CardSubtitle>
        </div>
        <div className="m-3">
        <CardSubtitle className="mb-2 dashboard-title mt-3">Average Per Item</CardSubtitle>
        <CardSubtitle className="small-reporting">${this.avgPerItem()}</CardSubtitle>
        </div>
        </div>
        </CardBody>
        </Card>
        </div>
        <ShipQueue />
        </div>
        <PastOrders />
                    </Col>
                </Row>
            </Container>

      </div>
    );
  }
}

export default Orders;
