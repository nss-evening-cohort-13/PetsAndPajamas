/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import customerOrderData from '../../helpers/data/customerOrderData';
import AppModal from '../AppModal';
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
      <td>${totalSales.toFixed(2)}</td>
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
      <>
      <h3>Past Orders</h3>
      <Table striped bordered hover size="sm">
                    <thead className="past-order-table">
                        <tr>
                        <th>Order No.</th>
                        <th>Order Date</th>
                        <th>Order Total</th>
                        <th>Order Details</th>
                        </tr>
                    </thead>
                    <tbody className="past-order-table-body">
                      {this.renderCompletedOrders()}
                    </tbody>
                </Table>
                </>
    );
  }
}

export default PastOrders;
