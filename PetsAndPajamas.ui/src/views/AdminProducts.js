import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import pajamaData from '../helpers/data/pajamaData';
import AddProductForm from '../components/ProductForm';
import AppModal from '../components/AppModal';
import TotalInventory from '../components/TotalInventory';

class AdminProducts extends Component {
  state = {
    pajamas: [],
  }

  getAllPajamaInventory = () => {
    pajamaData.getAllPajamas()
      .then((response) => this.setState({
        pajamas: response,
      }));
  }

  render() {
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
                  title={'Add a Pajama'}>
        <AddProductForm handleUpdate={() => this.getAllPajamaInventory()} />
        </AppModal>
        <TotalInventory />
        </Col>
                </Row>
            </Container>
        </div>
      </div>
    );
  }
}

export default AdminProducts;
