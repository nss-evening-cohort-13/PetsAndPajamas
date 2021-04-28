import React from 'react';
import { Table } from 'react-bootstrap';

export default class OrderSummary extends React.Component {
  render() {
    const { order } = this.props;

    let renderPajamas;
    if (order && Object.keys(order).length !== 0) {
      renderPajamas = order.orderPajamas.map((p) => <tr key={p.id}>
            <td className="product-td"><img src={p.image} alt={p.description} className="summary-img"></img><p>{p.title}</p></td>
            <td>{p.size}</td>
            <td>quantity</td>
            <td>${p.price}</td>
          </tr>);
    }

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
              {renderPajamas}
            </tbody>
          </Table>
          <h3 className="total-line">Amount Due: $13.99</h3>
        </div>
    );
  }
}
