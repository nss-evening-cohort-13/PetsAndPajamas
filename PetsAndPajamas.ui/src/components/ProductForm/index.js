/* eslint-disable no-unused-vars */
import React from 'react';
import firebase from 'firebase';
import moment from 'moment-timezone';
import { Form, Button } from 'react-bootstrap';
import AppModal from '../AppModal';
import pajamaData from '../../helpers/data/pajamaData';

export default class ProductForm extends React.Component {
    state = {
      title: '',
      description: '',
      petTypeId: '',
      pajamaTypeId: '',
      size: '',
      color: '',
      pattern: '',
      price: '',
      inventory: '',
      dateCreated: moment().tz('America/Chicago').format(),
      isActive: '',
      image: ''
    }

    handleChange = (e) => {
      if (e.target.id === 'image') {
        this.setState({
          image: ''
        });
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`images/${e.target.files[0].name}-${Date.now()}`);
        imageRef.put(e.target.files[0]).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((image) => {
            this.setState({ image });
          });
        });
      } else if (e.target.id === 'petTypeId'
                 || e.target.id === 'pajamaTypeId'
                 || e.target.id === 'inventory') {
        this.setState({
          [e.target.id]: parseInt(e.target.value, 10),
        });
      } else if (e.target.id === 'price') {
        this.setState({
          [e.target.id]: parseFloat(e.target.value, 10),
        });
      } else if (e.target.id === 'isActive' || e.target.id === 'pattern') {
        this.setState({
          [e.target.id]: Boolean(e.target.value),
        });
      } else {
        this.setState({
          [e.target.id]: e.target.value,
        });
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      pajamaData.addPajama(this.state);
    }

    render() {
      return (
            <>
            <AppModal title='Add a Product'>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={this.handleChange} value={this.state.title} required/>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" onChange={this.handleChange} value={this.state.description} required/>
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Group controlId="petTypeId">
                    <Form.Label>Pet</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange} value={this.state.petTypeId} required>
                        <option value="" selected disabled hidden>Select a pet</option>
                        <option value="2">Dog</option>
                        <option value="1">Cat</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="pajamaTypeId">
                    <Form.Label>Pajama Type</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange} value={this.state.pajamaTypeId} required>
                        <option value="" selected disabled hidden>Select a pajama type</option>
                        <option value="1">Full Body</option>
                        <option value="2">Half Body</option>
                        <option value="8">Booties</option>
                        <option value="12">Mask</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="size">
                    <Form.Label>Size</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange} value={this.state.size} required>
                        <option value="" selected disabled hidden>Select a size</option>
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="color">
                    <Form.Label>Color</Form.Label>
                    <Form.Control type='text' onChange={this.handleChange} value={this.state.color} required/>
                </Form.Group>
                <Form.Group controlId="pattern">
                    <Form.Label>Pattern</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange} value={this.state.pattern} required>
                        <option value="" selected disabled hidden>Select an option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' onChange={this.handleChange} value={this.state.price} required/>
                </Form.Group>
                <Form.Group controlId="inventory">
                    <Form.Label>Inventory</Form.Label>
                    <Form.Control type='number' onChange={this.handleChange} value={this.state.inventory} required/>
                </Form.Group>
                <Form.Group controlId="isActive">
                    <Form.Label>Available</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange} value={this.state.isActive} required>
                        <option value="" selected disabled hidden>Select availability</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form>
            </AppModal>
            </>
      );
    }
}
