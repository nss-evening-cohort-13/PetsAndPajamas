import React from 'react';
import { Table } from 'react-bootstrap';

export default class OrderSummary extends React.Component {
  render() {
    return (
            <div className="orderSummary">
          <h2>Order Summary</h2>
          <Table size="sm">
            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
          <h3 className="total-line">Amount Due: $13.99</h3>
        </div>
    );
  }
}
