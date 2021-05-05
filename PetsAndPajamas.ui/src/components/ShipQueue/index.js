import React from 'react';
import { Table } from 'react-bootstrap';

export default class ShipQueue extends React.Component {
    state = {
      orders: []
    }

    componentDidMount() {
    }

    render() {
      return (
            <div className='ship-queue-container'>
                <h3>Shipping Queue</h3>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Order No.</th>
                        <th>Est. Ship Date</th>
                        <th>Total Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
      );
    }
}
