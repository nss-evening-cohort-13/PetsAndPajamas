import React from 'react';
import customerOrderData from '../helpers/data/customerOrderData';

export default class CheckoutConfirmation extends React.Component {
  state = {
    order: {}
  }

  componentDidMount() {
    customerOrderData.getByUserId(this.props.userId).then((res) => this.setState({
      order: res
    }));
  }

  render() {
    return (
            <div className="checkout-conf-div">
            <h1>Thank you for your order</h1>
            <h3>Your order number is: {this.props.history.location.state.order.orderId}</h3>
            <p>You will receive an email confirmation shortly at {this.props.history.location.state.order.userEmailAddress}</p>
            </div>
    );
  }
}
