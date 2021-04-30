import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Select from 'react-select';
import pajamaData from '../helpers/data/pajamaData';
import customerOrderData from '../helpers/data/customerOrderData';
import pajamaOrderData from '../helpers/data/pajamaOrderData';

class ProductDetail extends Component {
  state = {
    pajama: {},
    order: {},
    quantity: 0,
    loading: true
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const pajamaId = this.props.match.params.id;
    const { userId } = this.props;
    this.getActiveOrder(userId);
    this.getPajama(pajamaId);
  }

  getPajama = (pajamaId) => {
    pajamaData.getSinglePajama(pajamaId).then((response) => {
      this.setState({
        pajama: response
      }, this.setLoading);
    });
  }

  getActiveOrder = (uid) => {
    customerOrderData.getByUserId(uid).then((res) => {
      this.setState({
        order: res
      });
    });
  }

  addPajamaToCart = (pajamaOrder) => {
    pajamaOrderData.createPajamaOrder(pajamaOrder);
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const {
      pajama, order, loading, quantity
    } = this.state;
    const thisPajama = pajama[0];
    const options = [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6' },
      { value: 7, label: '7' },
      { value: 8, label: '8' },
      { value: 9, label: '9' },
      { value: 10, label: '10' }
    ];
    return (
      <>
      { loading ? (
        <div><h2>Loading...</h2></div>
      ) : (
      <div>
          <h1 className='m-5'>{thisPajama.title}</h1>
          <div className='m-5 d-flex column-wrap justify-content-center'>
          <img className='pajama-detail-img' src={thisPajama.image} alt={thisPajama.title}></img>
          <div className='w-50 ml-5 mt-5'>
          <p>{thisPajama.description}</p>
          <p className='mt-3'>Price: ${thisPajama.price}</p>
          <p className='pajama-in-stock'>{thisPajama.inventory !== 0 && 'In Stock'}</p>
          <p>{thisPajama.inventory === 0 && 'Out of Stock'}</p>
          <div className='mt-3 d-flex column-wrap justify-content-center'>
          <p>Size: {thisPajama.size}</p>
          <p className='ml-5'>Color: {thisPajama.color}</p>
          </div>
          <p className='mb-2'>Quantity</p>
          <div className='d-flex justify-content-center'>
          <Select className='w-50'
            options={options}
            onChange={(e) => this.setState({ quantity: e.value })}/>
            </div>
          <Button className='mt-3' color='success' onClick={() => this.addPajamaToCart({ orderId: order.orderId, pajamaId: pajama[0].id, quantity })}>Add to Cart</Button>
          </div>
          </div>

      </div>
      )
  }
      </>
    );
  }
}

export default ProductDetail;
