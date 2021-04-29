import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default class ShoppingCart extends React.Component {
  state = {
    Image: '',
    Description: '',
  }

  render() {
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
            </Table>
            <Button variant="primary" type="submit">Continue To Checkout</Button>
        </div>
    );
  }
}
