/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment-timezone';

class PastOrderDetails extends Component {
  renderOrderDetails = () => this.props.order.orderPajamas.map((op) => <tr key={op.Id}>
              <td>{op.title}</td>
              <td>${op.price}</td>
              <td>{op.pajamaQuantity}</td>
              <td>${op.pajamaQuantity * op.price}</td>
             </tr>)

  render() {
    const { order } = this.props;
    return (
      <>
      <h3>Customer: {order.userFirstName} {order.userLastName}</h3>
      <h3>Order number: {order.orderId}</h3>
      <h3>Order date: {moment(order.newOrderDate).format('MMMM D, YYYY')}</h3>
      <h3>Ship date: {moment(order.newShipDate).format('MMMM D, YYYY')}</h3>
      <h3>Status: {moment(order.newShipDate).isBefore() ? 'Completed' : 'Pending'}</h3>
      <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Item</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Item Total</th>
                        </tr>
                    </thead>
                    <tbody>
                      {this.renderOrderDetails()}
                    </tbody>
                </Table>
                </>
    );
  }
}

export default PastOrderDetails;
