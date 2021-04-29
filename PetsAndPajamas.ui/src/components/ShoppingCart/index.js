import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default class ShoppingCart extends React.Component {
  render() {
      const { order } = this.props;

      let renderPajamas;
    if (order && Object.keys(order).length !== 0) {
      renderPajamas = order.orderPajamas.map((p) => <tr key={p.id}>
            <td className="product-td"><img src={p.image} alt={p.description} className="summary-img"></img><p>{p.title}</p></td>
            <td>{p.size}</td>
            <td>{p.pajamaQuantity}</td>
            <td>${p.price}</td>
          </tr>);
    }

    return (
        <div className="cartSummary">
            <h1>Shopping Cart Summary</h1>
            <Table size="lg">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                        <th>Item Total</th>
                    </tr>
                </thead>
                <tbody>
                  {renderPajamas}
            </tbody>
            </Table>
            <Button variant="primary" type="submit">Continue To Checkout</Button>
        </div>
    );
  }
}
