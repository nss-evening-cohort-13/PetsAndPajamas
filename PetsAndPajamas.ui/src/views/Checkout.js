import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';

export default class Checkout extends React.Component {
  state = {
    order: {}
  }

  render() {
    return (
      <div className="checkoutPage">
      <CheckoutForm />
      <OrderSummary />
      </div>
    );
  }
}
