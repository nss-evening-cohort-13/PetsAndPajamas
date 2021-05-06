import React, { Component } from 'react';
import {
  Card, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import ShipQueue from '../components/ShipQueue';
import pajamaOrderData from '../helpers/data/pajamaOrderData';

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
    return total;
  }

  avgPerItem = () => {
    let total = 0;
    let totalQuantity = 0;
    this.state.pajamaOrders.forEach((order) => {
      total += (order.quantity * order.pajama.price);
      totalQuantity += order.quantity;
    });
    console.log(this.state.pajamaOrders.length);
    const average = total / totalQuantity;
    return average.toFixed(2);
  }

  monthlySales = () => {
    let total = 0;
    this.state.currentMonthOrders.forEach((order) => {
      total += (order.quantity * order.pajama.price);
    });
    return total;
  }

  render() {
    return (
      <div>
        <h1>Orders</h1>
        <ShipQueue />
        <div className="w-25 m-3">
        <Card>
          <CardBody>
        <CardTitle>Total Sales: ${this.totalSales()}</CardTitle>
        <div className="d-flex row-wrap justify-content-center">
          <div className="m-3">
        <CardSubtitle className="mb-2">This Month</CardSubtitle>
        <CardSubtitle>${this.monthlySales()}</CardSubtitle>
        </div>
        <div className="m-3">
        <CardSubtitle className="mb-2">Average Per Item</CardSubtitle>
        <CardSubtitle>${this.avgPerItem()}</CardSubtitle>
        </div>
        </div>
        </CardBody>
        </Card>
        </div>

      </div>
    );
  }
}

export default Orders;
