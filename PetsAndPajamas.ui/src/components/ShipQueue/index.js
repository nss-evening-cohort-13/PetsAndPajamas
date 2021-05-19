/* eslint-disable no-return-assign */
import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment-timezone';
import customerOrderData from '../../helpers/data/customerOrderData';

export default class ShipQueue extends React.Component {
    state = {
      orders: []
    }

    componentDidMount() {
      const todaysDate = moment().startOf('date').format();
      customerOrderData.getShipQueue(todaysDate).then((res) => {
        this.setState({
          orders: res
        });
      });
    }

    renderShipQueue = () => this.state.orders.map((o) => {
      let totalQuantity = 0;
      o.orderPajamas.forEach((p) => totalQuantity += p.pajamaQuantity);
      return <tr key={o.orderId}>
                <td>{o.orderId}</td>
                <td>{moment(o.newShipDate).format('M/D/YY')}</td>
                <td>{totalQuantity}</td>
               </tr>;
    })

    render() {
      return (
            <div className='ship-queue-container'>
                <h3>Shipping Queue</h3>
                <Table striped bordered hover size="sm">
                    <thead className="ship-queue-table">
                        <tr>
                        <th>Order No.</th>
                        <th>Est. Ship Date</th>
                        <th>Total Quantity</th>
                        </tr>
                    </thead>
                    <tbody className="ship-queue-table-body">
                        {this.renderShipQueue()}
                    </tbody>
                </Table>
            </div>
      );
    }
}
