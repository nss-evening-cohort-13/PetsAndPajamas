import React, { Component } from 'react';
import { Table } from 'reactstrap';
import AddProductForm from '../ProductForm';
import AppModal from '../AppModal';
import pajamaData from '../../helpers/data/pajamaData';

export default class TotalInventory extends Component {
    state = {
      pajamas: []
    }

    componentDidMount() {
      this.getAllPajamaInventory();
    }

    getAllPajamaInventory = () => {
      pajamaData.getAllPajamas().then((response) => this.setState({
        pajamas: response,
      }));
    }

    renderPajamaInventory = () => this.state.pajamas.map((pajama) => <tr key={pajama.id}>
        <img src={pajama.image} alt='' className='product-image' />
        <td>{pajama.title}</td>
        <td>{pajama.inventory}</td>
        <td><AppModal
        title={'Update Pajama'}
        id={pajama.id}
        pajama={pajama}
        >
          <AddProductForm pajama={pajama} onSubmit={() => this.getAllPajamaInventory()} />
        </AppModal></td>
      </tr>)

    render() {
      return (
        <>
        <h2>Product Inventory Table</h2>
     <Table className="inventory-fixed-header" striped bordered hover size="sm">
         <thead className="inventory-table">
             <tr>
                 <th>Pajama Image</th>
                 <th>Pajama Title</th>
                 <th>Inventory</th>
                 <th>Update Inventory Item</th>
             </tr>
         </thead>
              <tbody className="inventory-table-body">
                {this.renderPajamaInventory()}
              </tbody>
     </Table>
     </>
      );
    }
}
