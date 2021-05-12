import React, { Component } from 'react';
import { Table } from 'reactstrap';
import pajamaData from '../../helpers/data/pajamaData';
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
        pajama, image, inventory, title
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
                  <img src={image} alt='' className='product-image'/>
                  <td>{title}</td>
                  <td>{inventory}</td>
                    <AppModal className='fas fa-edit fa-2x'
                    title={'Update Inventory Item'}
                    id={pajama.id}
                    pajama={pajama}>
                    </AppModal>
                </tr>
              </tbody>
     </Table>
      );
    }
}
