import React, { Component } from 'react';
import { Table } from 'reactstrap';
import pajamaData from '../helpers/data/pajamaData';
import TotalInventory from '../components/TotalInventory';

class AdminProducts extends Component {
  state = {
    pajamas: [],
  }

  componentDidMount() {
    this.getAllPajamaInventory();
  }

  getAllPajamaInventory = () => {
    pajamaData.getAllPajamas()
      .then((response) => this.setState({
        pajamas: response,
      }));
  }

  render() {
    const { pajamas } = this.state;

    const renderPajamas = () => (
      pajamas.map((pajama) => (
        <TotalInventory key={pajama.id} pajama={pajama} image={pajama.image} title={pajama.title} inventory={pajama.inventory} />
      ))
    );

    return (
      <div className='table-of-pajama-inventory'>
        <Table boardered>
          <tbody>
            <tr>
              <td>
                {pajamas.length
                  ? renderPajamas()
                  : 'There are no pajamas in inventory.'}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AdminProducts;
