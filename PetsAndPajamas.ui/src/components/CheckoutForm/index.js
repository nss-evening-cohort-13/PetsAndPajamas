import React from 'react';
import {
  Form, Button, Col
} from 'react-bootstrap';
import moment from 'moment-timezone';
import customerOrderData from '../../helpers/data/customerOrderData';
import paymentTypeData from '../../helpers/data/paymentTypeData';

export default class CheckoutForm extends React.Component {
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
      totalCost: this.props.order.orderTotalCost,
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
            <Button variant="primary" type="submit">
              Check Out
            </Button>
          </Form>
      </div>
    );
  }
}
