import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Table } from 'reactstrap';
import Sidebar from '../components/Sidebar';
import pajamaData from '../helpers/data/pajamaData';
import TotalInventory from '../components/TotalInventory';
import AddProductForm from '../components/ProductForm';
import AppModal from '../components/AppModal';

class AdminProducts extends Component {
  state = {
    pajamas: [],
  }

  componentDidMount() {
    this.getAllPajamaInventory();
  }

  componentDidUpdate() {
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
      <div className='products-div'>
        <div className='table-of-pajama-inventory'>
        <Container fluid>
                <Row>
                    <Col xs={-1} id="sidebar-wrapper">
                      <Sidebar />
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                    <AppModal
                  className='mt-4'
                  title={'Add a Pajama'}>
        <AddProductForm handleUpdate={() => this.getAllPajamaInventory()} />
        </AppModal>
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
        </Col>
                </Row>
            </Container>
        </div>
      </div>
    );
  }
}

export default AdminProducts;
