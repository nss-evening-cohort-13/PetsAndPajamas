import React, { Component } from 'react';
import pajamaOrderData from '../helpers/data/pajamaOrderData';

class Orders extends Component {
  state = {
    pajamaOrders: []
  }

  componentDidMount() {
    this.getPajamaOrders();
  }

  getPajamaOrders = () => {
    pajamaOrderData.getAllPajamaOrders().then((response) => {
      this.setState({
        pajamaOrders: response
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

  render() {
    // const { pajamaOrders } = this.state;

    return (
      <div>
        <h1>Orders</h1>
        Total Sales: ${this.totalSales()}
      </div>
    );
  }
}

export default Orders;
