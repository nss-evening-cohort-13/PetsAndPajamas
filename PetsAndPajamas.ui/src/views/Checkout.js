import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';
import customerOrderData from '../helpers/data/customerOrderData';

export default class Checkout extends React.Component {
  state = {
    order: {}
  }

  componentDidMount() {
    const { userId } = this.props;
    customerOrderData.getByUserId(userId).then((res) => this.setState({
      order: res
    }));
  }

  render() {
    return (
      <div className="checkoutPage">
      <CheckoutForm order={this.state.order} submitOrder={this.submitOrder} />
      <OrderSummary order={this.state.order} />
      </div>
    );
  }
}
