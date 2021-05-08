/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import customerOrderData from '../../helpers/data/customerOrderData';
import AppModal from '../AppModal/inventoryUpdate';
import PastOrderDetails from '../PastOrderDetails';

class PastOrders extends Component {
  state = {
    orders: []
  }

  componentDidMount() {
    customerOrderData.getCompletedOrders().then((response) => {
      this.setState({
        orders: response
      });
    });
  }

  renderCompletedOrders = () => this.state.orders.map((order) => {
    let totalSales = 0;
    order.orderPajamas.forEach((pajama) => totalSales += (pajama.pajamaQuantity * pajama.price));
    return <tr key={order.orderId}>
      <td>{order.orderId}</td>
      <td>{moment(order.newOrderDate).format('M/D/YY')}</td>
      <td>${totalSales}</td>
      <td><AppModal
      title={'Order Details'}
      id={order.orderId}
      order={order}
      >
        <PastOrderDetails order={order} />
      </AppModal>
      </td>
    </tr>;
  })

  render() {
    return (
      <div>
      <h3>Past Orders</h3>
      <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Order No.</th>
                        <th>Order Date</th>
                        <th>Total Sales</th>
                        <th>Order Details</th>
                        </tr>
                    </thead>
                    <tbody>
                      {this.renderCompletedOrders()}
                    </tbody>
                </Table>
                </div>
    );
  }
}

export default PastOrders;
