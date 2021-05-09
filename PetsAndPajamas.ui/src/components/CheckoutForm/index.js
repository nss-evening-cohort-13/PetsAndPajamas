/* eslint-disable no-return-assign */
import React from 'react';
import {
  Form, Button, Col
} from 'react-bootstrap';
import moment from 'moment-timezone';
import { withRouter } from 'react-router';
import customerOrderData from '../../helpers/data/customerOrderData';
import paymentTypeData from '../../helpers/data/paymentTypeData';
import pajamaData from '../../helpers/data/pajamaData';

class CheckoutForm extends React.Component {
  state = {
    paymentType: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    shipAddress: '',
    shipCity: '',
    shipState: '',
    shipZip: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const date = moment(Date.now());
    const soldPajamas = this.props.order.orderPajamas;
    let total = 0;
    soldPajamas.forEach((pajama) => total += (pajama.price * pajama.pajamaQuantity));
    const newOrder = {
      userId: this.props.order.userId,
      orderDate: date.tz('America/Chicago').format(),
      shipDate: date.add(2, 'days').tz('America/Chicago').format(),
      shipAddress: this.state.shipAddress,
      shipCity: this.state.shipCity,
      shipState: this.state.shipState,
      shipZip: parseInt(this.state.shipZip, 10),
      shipCountry: 'United States',
      paymentId: this.props.order.paymentId,
      totalCost: total,
      isCompleted: true,
      id: this.props.order.orderId
    };
    customerOrderData.updateOrder(this.props.order.orderId, newOrder);

    const newPaymentType = {
      type: 'Credit Card',
      accountNumber: this.state.cardNumber,
      cvv: this.state.cvv,
      expirationMonth: this.state.expMonth,
      expirationYear: this.state.expYear,
      creditCardType: this.state.paymentType,
      isActive: true,
    };
    paymentTypeData.addPaymentType(newPaymentType);

    const allUpdatePromises = [];
    soldPajamas.forEach((pajama) => {
      const newInventory = pajama.inventory - pajama.pajamaQuantity;
      const newPajama = {
        size: pajama.size,
        color: pajama.color,
        pattern: pajama.pattern,
        price: pajama.price,
        description: pajama.description,
        inventory: newInventory,
        title: pajama.title,
        dateCreated: pajama.dateCreated,
        isActive: pajama.isActive,
        pajamaTypeId: pajama.pajamaType.id,
        petTypeId: pajama.petType.id,
        id: pajama.id
      };
      const promise = pajamaData.updatePajama(pajama.id, newPajama);
      allUpdatePromises.push(promise);
    });
    const orderInfo = {
      UserId: this.props.user.id,
      OrderDate: date.tz('America/Chicago').format(),
      ShipDate: date.add(2, 'days').tz('America/Chicago').format(),
      TotalCost: 0.00,
      IsCompleted: false
    };
    const newOrderPromise = customerOrderData.createCustomerOrder(orderInfo);
    allUpdatePromises.push(newOrderPromise);
    Promise.all(allUpdatePromises).catch((err) => console.warn(err));

    const { history, order } = this.props;
    history.push('/checkout/confirmation', { order });
  }

  render() {
    return (
<div className="checkoutForm">
          <h1>Checkout</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="paymentType">
              <Form.Label>Payment Type</Form.Label>
              <Form.Control as="select" onChange={this.handleChange} value={this.state.paymentType} required>
                <option value="" selected disabled hidden>Choose card type</option>
                <option>Visa</option>
                <option>Mastercard</option>
                <option>American Express</option>
                <option>Discover</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="cardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="number" onChange={this.handleChange} value={this.state.cardNumber} required />
            </Form.Group>
            <Form.Row>
            <Form.Group as={Col} controlId="expMonth">
              <Form.Label>Expiration Month</Form.Label>
              <Form.Control as="select" onChange={this.handleChange} value={this.state.expMonth} required>
                <option value="" selected disabled hidden>Month</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="expYear">
            <Form.Label>Expiration Year</Form.Label>
              <Form.Control as="select" onChange={this.handleChange} value={this.state.expYear} required>
                <option value="" selected disabled hidden>Year</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
                <option>2028</option>
                <option>2029</option>
                <option>2030</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="cvv">
              <Form.Label>CVV</Form.Label>
              <Form.Control type="number" onChange={this.handleChange} value={this.state.cvv} required />
            </Form.Group>
            </Form.Row>
            <Form.Group as={Col} controlId="shipAddress">
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control type="text" onChange={this.handleChange} value={this.state.shippingAddress} required />
            </Form.Group>
            <Form.Row>
            <Form.Group as={Col} controlId="shipCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" onChange={this.handleChange} value={this.state.city} required />
            </Form.Group>
            <Form.Group as={Col} controlId="shipState">
            <Form.Label>State</Form.Label>
              <Form.Control as="select" onChange={this.handleChange} value={this.state.state} required >
                <option value="" selected disabled hidden>Choose state</option>
                <option>AL</option>
                <option>AK</option>
                <option>AS</option>
                <option>AZ</option>
                <option>AR</option>
                <option>CA</option>
                <option>CO</option>
                <option>CT</option>
                <option>DE</option>
                <option>DC</option>
                <option>FL</option>
                <option>GA</option>
                <option>HI</option>
                <option>ID</option>
                <option>IL</option>
                <option>IN</option>
                <option>IA</option>
                <option>KS</option>
                <option>KY</option>
                <option>LA</option>
                <option>ME</option>
                <option>MD</option>
                <option>MA</option>
                <option>MI</option>
                <option>MN</option>
                <option>MS</option>
                <option>MO</option>
                <option>MT</option>
                <option>NE</option>
                <option>NV</option>
                <option>NH</option>
                <option>NJ</option>
                <option>NM</option>
                <option>NY</option>
                <option>NC</option>
                <option>ND</option>
                <option>OH</option>
                <option>OK</option>
                <option>OR</option>
                <option>PA</option>
                <option>PR</option>
                <option>RI</option>
                <option>SC</option>
                <option>SD</option>
                <option>TN</option>
                <option>TX</option>
                <option>UT</option>
                <option>VT</option>
                <option>VA</option>
                <option>WA</option>
                <option>WV</option>
                <option>WI</option>
                <option>WY</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="shipZip">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="number" onChange={this.handleChange} value={this.state.zipCode} required />
            </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit" onClick={this.handleClick}>
              Check Out
            </Button>
          </Form>
      </div>
    );
  }
}

export default withRouter(CheckoutForm);
