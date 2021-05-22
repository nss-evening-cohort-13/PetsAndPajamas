import React, { Component } from 'react';
import { Button, Spinner } from 'reactstrap';
import Select from 'react-select';
import firebase from 'firebase';
import axios from 'axios';
import moment from 'moment-timezone';
import pajamaData from '../helpers/data/pajamaData';
import customerOrderData from '../helpers/data/customerOrderData';
import baseUrl from '../helpers/config.json';
import pajamaOrderData from '../helpers/data/pajamaOrderData';

class ProductDetail extends Component {
  state = {
    pajama: {},
    order: {},
    quantity: 0,
    pajamaOrder: {},
    clicked: false,
    loading: true
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const pajamaId = this.props.match.params.id;
    const { userId } = this.props;
    if (this.props.user) {
      this.getActiveOrder(pajamaId, userId);
    }
    this.getPajama(pajamaId);
  }

  getPajama = (pajamaId) => {
    pajamaData.getSinglePajama(pajamaId).then((response) => {
      this.setState({
        pajama: response
      }, this.setLoading);
    });
  }

  getActiveOrder = (pajamaId, uid) => {
    customerOrderData.getByUserId(uid).then((res) => {
      if (res.orderPajamas.filter((pajama) => pajama.id === Number(pajamaId)).length > 0) {
        pajamaOrderData.getSinglePajamaOrder(pajamaId, res.orderId).then((re) => {
          this.setState({
            order: res,
            pajamaOrder: re
          }, this.setLoading);
        });
      } else {
        this.setState({
          order: res,
        }, this.setLoading);
      }
    });
  }

  addPajamaToCart = (pajamaOrder) => {
    pajamaOrderData.createPajamaOrder(pajamaOrder);
  }

  updatePajamaQuantity = (pajamaId, pajamaOrder) => {
    pajamaOrderData.updatePajamaOrder(pajamaId, pajamaOrder);
  }

  deactivateButton = () => {
    const currentState = this.state.clicked;
    this.setState({ clicked: !currentState });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((cred) => {
      const user = cred.additionalUserInfo.profile;
      if (cred.additionalUserInfo.isNewUser) {
        // get uid from firebase, the rest of this info is just made up, whatever registration information you're already saving to the database
        const userInfo = {
          firebaseid: cred.user.uid,
          firstname: user.given_name,
          lastname: user.family_name,
          emailaddress: user.email,
          admin: false,
          isactive: true
          // cred here is the created, logged in user from firebase
        };
        // save the user to the the api
        axios.post(`${baseUrl}/siteusers`, userInfo).then((response) => {
          const date = moment(Date.now());
          const orderInfo = {
            UserId: response.data.id,
            OrderDate: date.tz('America/Chicago').format(),
            ShipDate: date.add(2, 'days').tz('America/Chicago').format(),
            TotalCost: 0.00,
            IsCompleted: false
          };
          customerOrderData.createCustomerOrder(orderInfo);
        });
      }
    });
  };

  render() {
    const {
      pajama, order, loading, quantity, clicked, pajamaOrder
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
        <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      ) : (
      <div>
          <h1 className='product-detail-header'>{thisPajama.title}</h1>
          <div className='product-detail-container m-5 d-flex column-wrap justify-content-center'>
          <img className='pajama-detail-img' src={thisPajama.image} alt={thisPajama.title}></img>
          <div className='w-50 ml-5 mt-5'>
          <p>{thisPajama.description}</p>
          <p className='mt-3'>Price: ${thisPajama.price}</p>
          <p className='pajama-in-stock'>{thisPajama.inventory > 10 && 'In Stock'}</p>
          <p className='text-danger'>{(thisPajama.inventory > 0 && thisPajama.inventory <= 10) && `Only ${thisPajama.inventory} left!`} </p>
          <p className='text-danger'>{thisPajama.inventory === 0 && 'Out of Stock'}</p>
          <div className='mt-3 d-flex column-wrap justify-content-center'>
          <p>Size: {thisPajama.size}</p>
          <p className='ml-5'>Color: {thisPajama.color}</p>
          </div>

            {this.props.user === false
              ? <button className='btn btn-secondary mt-2' onClick={this.loginClickEvent}>
                Login to purchase products
              </button>
              : <>
            {clicked ? (
            <Button className='btn btn-secondary' disabled>Pajama Added to Cart!</Button>
            )
              : <><p className='mb-2'>Quantity</p>
              <div className='d-flex justify-content-center'>
              <Select className='w-25'
                options={options}
                onChange={(e) => this.setState({ quantity: e.value })}
                label='Quantity'/>
                </div><Button className='mt-3' color='success' onClick={() => {
                  if (thisPajama.inventory >= quantity) {
                    if (pajamaOrder.length) {
                      this.updatePajamaQuantity(thisPajama.id, {
                        id: pajamaOrder[0].id, orderId: pajamaOrder[0].orderId, pajamaId: pajamaOrder[0].pajamaId, quantity: pajamaOrder[0].quantity += quantity
                      });
                    } else {
                      this.addPajamaToCart({ orderId: order.orderId, pajamaId: pajama[0].id, quantity });
                    }
                    this.deactivateButton();
                  }
                }}>Add to Cart</Button></>
            }
            {thisPajama.inventory < quantity && <p className='text-danger'>Only {thisPajama.inventory} left in stock. Please update the quantity.</p>}</>}

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
