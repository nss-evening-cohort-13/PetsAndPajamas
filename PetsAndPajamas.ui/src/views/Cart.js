import React from 'react';
import ShoppingCart from '../components/ShoppingCart';
import customerOrderData from '../helpers/data/customerOrderData';

export default class Cart extends React.Component {
  state = {
    order: {}
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems = () => {
    const { userId } = this.props;
    customerOrderData.getByUserId(userId).then((res) => this.setState({
      order: res
    }));
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
