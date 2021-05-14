/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import customerOrderData from '../../helpers/data/customerOrderData';
import AppModal from '../AppModal';
import PastOrderDetails from '../PastOrderDetails';

class UserOrderHistory extends Component {
  state = {
    orders: []
  }

  componentDidMount() {
    const { user } = this.props;
    customerOrderData.getAllUserOrders(user.uid).then((res) => this.setState({
      orders: res
    }));
  }

    renderOrders = () => this.state.orders.map((order) => {
      let totalSales = 0;
      order.orderPajamas.forEach((pajama) => totalSales += (pajama.pajamaQuantity * pajama.price));
      return <tr key={order.orderId}>
        <td>{order.orderId}</td>
        <td>{moment(order.newOrderDate).format('M/D/YY')}</td>
        <td>{moment(order.newShipDate).format('M/D/YY')}</td>
        <td>${totalSales}</td>
        {moment(order.newShipDate).isBefore() ? <td>Completed</td> : <td>Pending</td>}
        <td><AppModal
        title={'View Order'}
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
      <div className="order-history-div">
      <Table striped bordered hover size="sm">
                    <thead className="history-table-head">
                        <tr>
                        <th className="history-fixed-header">Order No.</th>
                        <th className="history-fixed-header">Order Date</th>
                        <th className="history-fixed-header">Ship Date</th>
                        <th className="history-fixed-header">Total</th>
                        <th className="history-fixed-header">Status</th>
                        <th className="history-fixed-header">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                      {this.renderOrders()}
                    </tbody>
                </Table>
                </div>
      );
    }
}

export default UserOrderHistory;
