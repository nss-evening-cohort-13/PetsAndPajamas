import React from 'react';
import {
  Form, Button, Col, Table
} from 'react-bootstrap';

export default class Checkout extends React.Component {
  render() {
    return (
      <div className="checkoutPage">
      <div className="checkoutForm">
          <h1>Checkout</h1>
          <Form>
            <Form.Group controlId="PaymentType">
              <Form.Label>Payment Type</Form.Label>
              <Form.Control as="select">
                <option>Visa</option>
                <option>Mastercard</option>
                <option>American Express</option>
                <option>Discover</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="CardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Row>
            <Form.Group as={Col} controlId="ExpMonth">
              <Form.Label>Expiration Month</Form.Label>
              <Form.Control as="select">
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
            <Form.Group as={Col} controlId="ExpYear">
            <Form.Label>Expiration Year</Form.Label>
              <Form.Control as="select">
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
            <Form.Group as={Col} controlId="CVV">
              <Form.Label>CVV</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            </Form.Row>
            <Form.Group as={Col} controlId="ShippingAddress">
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Row>
            <Form.Group as={Col} controlId="City">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group as={Col} controlId="State">
            <Form.Label>State</Form.Label>
              <Form.Control as="select">
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
            <Form.Group as={Col} controlId="ZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
              Check Out
            </Button>
          </Form>
      </div>
      <div className="orderSummary">
          <h2>Order Summary</h2>
          <Table size="sm">
            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
          <h3 className="total-line">Amount Due: $13.99</h3>
        </div>
      </div>
    );
  }
}
