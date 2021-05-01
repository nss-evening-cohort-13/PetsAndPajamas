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
    console.log(userId);
    customerOrderData.getByUserId(userId).then((res) => this.setState({
      order: res
    }));
  }

  removeCartItem = () => {
    pajamaOrderData.deleteCartItem(this.state.pajamaId, this.state.pajamaId).then((response) => {
      this.setState({
        orders: response
      });
    });
  }

  render() {
    return (
      <div>
        <div className="cartSummary">
        <ShoppingCart order={this.state.order} />
      </div>
      </div>
    );
  }
}
