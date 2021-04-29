import React from 'react';
import ShoppingCart from '../components/ShoppingCart';

export default class Cart extends React.Component {
  render() {
    return (
      <div>
        <div className="shoppingCart">
        <ShoppingCart />
      </div>
      </div>
    );
  }
}
