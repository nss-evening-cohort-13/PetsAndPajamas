import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class PastOrders extends Component {
  state = { }

  render() {
    return (
      <div>
      <h3>Past Orders</h3>
      <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Order No.</th>
                        <th>Order Date</th>
                        <th>Total Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
                </div>
    );
  }
}

export default PastOrders;
