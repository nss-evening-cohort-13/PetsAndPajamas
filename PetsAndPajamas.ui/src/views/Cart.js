import React from 'react';
import ShoppingCart from '../components/ShoppingCart';

export default class Cart extends React.Component {
  state = {
    order: {}
  }
  
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
