import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class EmptyShoppingCart extends React.Component {
  render() {
    return (
        <>
        <i className="fas fa-shopping-cart shopping-cart-empty"></i>
        <h1>Your shopping cart is empty</h1>
        <p>Once you have added items to your shopping cart, you can check out from here.</p>
        <Link to='/cat-store'><Button>View Cat Products</Button></Link>
        <Link to='/dog-store'><Button>View Dog Products</Button></Link>
        </>
    );
  }
}
