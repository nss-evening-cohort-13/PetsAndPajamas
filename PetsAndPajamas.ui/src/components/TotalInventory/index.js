import React, { Component } from 'react';
import { Table } from 'reactstrap';
import pajamaData from '../../helpers/data/pajamaData';
import AddProductForm from '../ProductForm';
import AppModal from '../AppModal';

export default class TotalInventory extends Component {
    state = {
      pajamas: {},
    }

    componentDidMount() {
      this.getAllPajamaInventory();
    }

    getAllPajamaInventory = () => {
      pajamaData.getAllPajamas().then((response) => this.setState({
        pajamas: response,
      }));
    }

    render() {
      const {
        image, inventory, title, pajama
      } = this.props;
      return (
     <Table>
         <thead>
             <tr>
                 <th>Pajama Image</th>
                 <th>Pajama Title</th>
                 <th>Inventory</th>
                 <th>Update Inventory Item</th>
             </tr>
         </thead>
              <tbody>
                <tr>
                  <td><img src={image} alt='' className='product-image'/></td>
                  <td>{title}</td>
                  <td>{inventory}</td>
                  <td><AppModal
                  title={'Update Pajama'}>
                       <AddProductForm pajama={pajama} handleUpdate={() => this.getAllPajamaInventory()} />
                       </AppModal></td>
                </tr>
              </tbody>
     </Table>
      );
    }
}
