import React from 'react';
import ShoppingCart from '../components/ShoppingCart';
import customerOrderData from '../helpers/data/customerOrderData';
import pajamaOrderData from '../helpers/data/pajamaOrderData';

export default class Cart extends React.Component {
  state = {
    order: {}
  }

  componentDidMount() {
    const { userId } = this.props;
    customerOrderData.getByUserId(userId).then((res) => this.setState({
      order: res
    }));
  }

  removeCartItem = (e) => {
    pajamaOrderData.deleteCartItem(this.props.orderId, e.targe.id);
  }

  render() {
    return (
      <div>
        <div className="cartSummary">
        <ShoppingCart order={this.state.order} removeItem={this.removeCartItem} />
      </div>
      </div>
    );
  }
}
