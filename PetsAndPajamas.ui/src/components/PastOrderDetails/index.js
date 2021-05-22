/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment-timezone';

class PastOrderDetails extends Component {
  renderOrderDetails = () => this.props.order.orderPajamas.map((op) => <tr key={this.props.order.orderId}>
              <td>{op.title}</td>
              <td>${op.price}</td>
              <td>{op.pajamaQuantity}</td>
              <td>${op.pajamaQuantity * op.price}</td>
             </tr>)

  render() {
    const { order } = this.props;
    return (
      <div className="past-order-details-div">
        <div className="info-div">
      <h3 className="details-info"><strong>Customer:</strong> {order.userFirstName} {order.userLastName}</h3>
      <h3 className="details-info"><strong>Order number:</strong> {order.orderId}</h3>
      <h3 className="details-info"><strong>Order date:</strong> {moment(order.newOrderDate).format('MMMM D, YYYY')}</h3>
      <h3 className="details-info"><strong>Ship date:</strong> {moment(order.newShipDate).format('MMMM D, YYYY')}</h3>
      <h3 className="details-info"><strong>Status:</strong> {moment(order.newShipDate).isBefore() ? 'Completed' : 'Pending'}</h3>
        </div>
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
                </div>
    );
  }
}

export default PastOrderDetails;
