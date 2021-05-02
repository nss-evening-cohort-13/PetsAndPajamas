import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import pajamaOrderData from '../../helpers/data/pajamaOrderData';

export default class ShoppingCart extends React.Component {
  state = {
    order: {}
  }

  removeCartItem = () => {
    pajamaOrderData.deleteCartItem(this.state.pajamaId, this.state.pajamaId).then((response) => {
      this.setState({
        orders: response
      });
    });
  }

  render() {
    const { order } = this.props;

    let renderPajamas;
    if (order && Object.keys(order).length !== 0) {
      renderPajamas = order.orderPajamas.map((p) => <tr key={p.id}>
            <td className="product-td"><img src={p.image} alt={p.description} className="summary-img"></img><p>{p.title}</p></td>
            <td>{p.size}</td>
            <td>{p.price}</td>
            <td>{p.pajamaQuantity}</td>
            <td>${p.price * p.pajamaQuantity}</td>
            <div>
              <Button
                className='btn-danger far fa-trash-alt fa-2x'
                onClick={console.log('CLICKED')}>
              </Button>
            </div>
          </tr>);
    }

    let renderTotal;
    if (order && Object.keys(order).length !== 0) {
      let total = 0;
      this.props.order.orderPajamas.forEach((pajama) => {
        total += (pajama.price * pajama.pajamaQuantity);
      });
      renderTotal = total;
    }

    return (
        <div className="cartSummary">
            <h1>Shopping Cart Summary</h1>
            <Table size="lg">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Size</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                        <th>Item Total</th>
                    </tr>
                </thead>
                <tbody>
            </tbody>
                {renderPajamas}
            </Table>
            <h3 className="cart-total">Cart Total: ${renderTotal}</h3>
            <Link to="/checkout">
              <Button type="button">Continue To Checkout</Button>
            </Link>
        </div>
    );
  }
}
