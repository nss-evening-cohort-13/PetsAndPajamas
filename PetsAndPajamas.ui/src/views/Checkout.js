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

  // submitOrder = (orderInfo) => {
  //   // const newOrder = {
  //   //   orderDate: Date.now(),
  //   //   shipDate: Date.now() + 2,
  //   //   shipAddress: orderInfo.shipAddress,
  //   //   shipCity: orderInfo.shipCity,
  //   //   shipState: orderInfo.shipState,
  //   //   shipZip: orderInfo.shipZip,
  //   //   shipCountry: 'United States',
  //   //   isCompleted: true
  //   // };
  //   // customerOrderData.updateOrder(this.state.order.orderId, newOrder);
  //   // console.log(this.state.order.orderId, newOrder);
  // }

  render() {
    return (
      <div className="checkoutPage">
      <CheckoutForm order={this.state.order} submitOrder={this.submitOrder} />
      <OrderSummary order={this.state.order} />
      </div>
    );
  }
}
