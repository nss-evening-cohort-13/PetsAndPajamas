/* eslint-disable no-unused-vars */
import React from 'react';
import firebase from 'firebase';
import moment from 'moment-timezone';
import { Form, Button } from 'react-bootstrap';
import AppModal from '../AppModal';

export default class AddProductForm extends React.Component {
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
      if (e.target.files[0]) {
        console.log(e.target.files[0]);
        this.setState({
          image: e.target.files[0]
        });
      }
      this.setState({
        [e.target.id]: e.target.value,
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { image } = this.state;
      const uploadTask = firebase.storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          firebase.storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
            });
        }
      );
    }

    render() {
      return (
            <>
            <AppModal title='Add a Product'>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={this.handleChange} value={this.state.title}/>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" onChange={this.handleChange} value={this.state.description} />
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={this.handleChange} value={this.state.image} />
                </Form.Group>
                <Form.Group controlId="petTypeId">
                    <Form.Label>Pet</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange} value={this.state.petTypeId}>
                        <option value="" selected disabled hidden>Select a pet</option>
                        <option value="2">Dog</option>
                        <option value="1">Cat</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="pajamaTypeId">
                    <Form.Label>Pajama Type</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange} value={this.state.pajamaTypeId}>
                        <option value="" selected disabled hidden>Select a pajama type</option>
                        <option value="1">Full Body</option>
                        <option value="2">Half Body</option>
                        <option value="8">Booties</option>
                        <option value="12">Mask</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="size">
                    <Form.Label>Size</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange} value={this.state.size}>
                        <option value="" selected disabled hidden>Select a size</option>
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="color">
                    <Form.Label>Color</Form.Label>
                    <Form.Control type='text' onChange={this.handleChange} value={this.state.color} />
                </Form.Group>
                <Form.Group controlId="pattern">
                    <Form.Label>Pattern</Form.Label>
                    <Form.Control type='text' onChange={this.handleChange} value={this.state.pattern} />
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' onChange={this.handleChange} value={this.state.price} />
                </Form.Group>
                <Form.Group controlId="inventory">
                    <Form.Label>Inventory</Form.Label>
                    <Form.Control type='number' onChange={this.handleChange} value={this.state.inventory} />
                </Form.Group>
                <Form.Group controlId="isActive">
                    <Form.Label>Available</Form.Label>
                    <Form.Control as="select" onChange={this.handleChange} value={this.state.isActive}>
                        <option value="" selected disabled hidden>Select availability</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
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
