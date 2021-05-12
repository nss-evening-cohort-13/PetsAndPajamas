import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';
import customerOrderData from '../helpers/data/customerOrderData';
import userData from '../helpers/data/userData';

export default class Checkout extends React.Component {
  state = {
    order: {},
    user: {}
  }

  componentDidMount() {
    const { userId } = this.props;
    userData.getUserByUid(userId).then((thisUser) => this.setState({
      user: thisUser
    }));
    customerOrderData.getByUserId(userId).then((res) => this.setState({
      order: res
    }));
  }

  render() {
    return (
      <div className="checkoutPage">
      <CheckoutForm user={this.state.user[0]} order={this.state.order} props={this.props} />
      <OrderSummary order={this.state.order} />
      </div>
    );
  }
}
