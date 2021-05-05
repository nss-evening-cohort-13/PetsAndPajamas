import React, { Component } from 'react';
import ShipQueue from '../components/ShipQueue';

class Orders extends Component {
  state = { }

  render() {
    return (
      <div>
        <h1>Orders</h1>
        <ShipQueue />
      </div>
    );
  }
}

export default Orders;
