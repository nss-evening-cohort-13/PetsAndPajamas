import React from 'react';
import { Button } from 'reactstrap';
import customerOrderData from '../helpers/data/customerOrderData';

export default class Cart extends React.Component {
  state = {
    pajamas: []
  }

  componentDidMount() {
    const orderId = this.props.match.params.id;

    this.getOrder(orderId);
  }

  getOrder = (orderId) => {
    customerOrderData.getSingleOrder(orderId).then((res) => {
      this.setState({
        order: res,
      });
    });
  }

  render() {
    const { order } = this.state;
    const thisOrder = order[0];

    return (
      <div>
          <h1 className='m-5'>{thisOrder.userFirstName}'s Cart</h1>
          <span>Item</span>
          <span>Unit Price</span>
          <span>Qty</span>
          <span>Item</span>
          <div className='m-5 d-flex column-wrap justify-content-center'>
          <img className='pajama-detail-img' src={thisOrder.image} alt={thisOrder.title}></img>
          <div className='w-50 ml-5 mt-5'>
          <p>{thisOrder.description}</p>
          <p className='mt-3'>Price: ${thisOrder.price}</p>
          <Button className='mt-3' color='success'>Continue to Checkout</Button>
      </div>
          </div>
      </div>
    );
  }
}
