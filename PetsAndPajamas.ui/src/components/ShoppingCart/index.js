import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import baseUrl from '../../helpers/config.json';
import pajamaOrderData from '../../helpers/data/pajamaOrderData';
import customerOrderData from '../../helpers/data/customerOrderData';
import EmptyShoppingCart from '../EmptyShoppingCart';

export default class ShoppingCart extends React.Component {
  state = {
    order: {}
  }

  componentDidMount() {
    this.getCartItems();
  }

  removeCartItem = (e, orderId) => {
    pajamaOrderData.deleteCartItem(e.target.id, orderId);
  }

  getCartItems = () => {
    const { userId } = this.props;
    customerOrderData.getByUserId(userId).then((res) => this.setState({
      order: res
    }));
  }

  componentDidUpdate() {
    this.getCartItems();
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((cred) => {
      const user = cred.additionalUserInfo.profile;
      if (cred.additionalUserInfo.isNewUser) {
        // get uid from firebase, the rest of this info is just made up, whatever registration information you're already saving to the database
        const userInfo = {
          firebaseid: cred.user.uid,
          firstname: user.given_name,
          lastname: user.family_name,
          emailaddress: user.email,
          admin: false,
          isactive: true
          // cred here is the created, logged in user from firebase
        };
        // save the user to the the api
        axios.post(`${baseUrl}/siteusers`, userInfo).then((response) => {
          const date = moment(Date.now());
          const orderInfo = {
            UserId: response.data.id,
            OrderDate: date.tz('America/Chicago').format(),
            ShipDate: date.add(2, 'days').tz('America/Chicago').format(),
            TotalCost: 0.00,
            IsCompleted: false
          };
          customerOrderData.createCustomerOrder(orderInfo);
        });
      }
    });
  };

  render() {
    const { order } = this.state;
    let renderPajamas;
    if (order && Object.keys(order).length !== 0) {
      renderPajamas = order.orderPajamas.map((p) => <tr key={p.id} >
            <td className="cart-image">
            <img src={p.image} alt='' className="summary-img"></img>
            </td>
            <td>{p.title}</td>
            <td>{p.size}</td>
            <td>{p.price}</td>
            <td>{p.pajamaQuantity}</td>
            <td>${p.price * p.pajamaQuantity}</td>
            <td>
              <Button
                className='btn-danger far fa-trash-alt fa-2x'
                id={p.id}
                onClick={(e) => this.removeCartItem(e, order.orderId)}>
              </Button>
            </td>
          </tr>);
    }
    let renderTotal;
    if (order && Object.keys(order).length !== 0) {
      let total = 0;
      this.state.order.orderPajamas.forEach((pajama) => {
        total += (pajama.price * pajama.pajamaQuantity);
      });
      renderTotal = total;
    }
    return (<>
    {order && order.orderPajamas && order.orderPajamas.length
      ? <div className="cartSummary">
            <h1>Shopping Cart Summary</h1>
            <Table className="shopping-cart-fixed-header">
                <thead className="shopping-cart-header">
                    <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Size</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                        <th>Item Total</th>
                    </tr>
                </thead>
                <tbody className="shopping-cart-body shopping-cart-table">
                {renderPajamas}
            </tbody>
            </Table>
            <h3 className="cart-total">Cart Total: ${renderTotal}</h3>
              { this.props.userId === undefined ? <button className='btn btn-secondary mt-2'
                                                          onClick={this.loginClickEvent}>
                                                          Login to purchase products
                                                  </button>
                : <Link to="/checkout">
                  <Button type="button">Continue To Checkout</Button>
                  </Link>}
        </div>
      : <EmptyShoppingCart />} </>);
  }
}
