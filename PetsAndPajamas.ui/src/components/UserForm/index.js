import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import userData from '../../helpers/data/userData';

class UserForm extends Component {
  state = {
    firstName: this.props.user?.firstName,
    lastName: this.props.user?.lastName,
    emailAddress: this.props.user?.emailAddress,
    dateCreated: this.props.user?.dateCreated,
    address: this.props.user?.address,
    city: this.props.user?.city,
    state: this.props.user?.state,
    zipCode: this.props.user?.zipCode,
    country: this.props.user?.country,
    phone: this.props.user?.phone,
    id: this.props.user?.id,
    admin: this.props.user?.admin,
    isActive: this.props.user?.isActive,
    firebaseId: this.props.user?.firebaseId
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    userData.updateUser(this.state.id, this.state);
  }

  render() {
    return (
      <Form>
      <Form.Group controlId='firstName'>
      <Form.Label>First Name</Form.Label>
      <Form.Control type="text" onChange={this.handleChange} value={this.state.firstName} required />
        </Form.Group>
      <Form.Group controlId='lastName'>
      <Form.Label>Last Name</Form.Label>
      <Form.Control type="text" onChange={this.handleChange} value={this.state.lastName} required />
        </Form.Group>
      <Form.Group controlId='emailAddress'>
      <Form.Label>Email Address</Form.Label>
      <Form.Control type="text" onChange={this.handleChange} value={this.state.emailAddress} required />
        </Form.Group>
      <Form.Group controlId='address'>
      <Form.Label>Street Address</Form.Label>
      <Form.Control type="text" onChange={this.handleChange} value={this.state.address} required />
        </Form.Group>
      <Form.Group controlId='city'>
      <Form.Label>City</Form.Label>
      <Form.Control type="text" onChange={this.handleChange} value={this.state.city} required />
        </Form.Group>
        <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
              <Form.Control as="select" onChange={this.handleChange} value={this.state.state} required >
                <option value="" selected disabled hidden>Choose state</option>
                <option>AL</option>
                <option>AK</option>
                <option>AS</option>
                <option>AZ</option>
                <option>AR</option>
                <option>CA</option>
                <option>CO</option>
                <option>CT</option>
                <option>DE</option>
                <option>DC</option>
                <option>FL</option>
                <option>GA</option>
                <option>HI</option>
                <option>ID</option>
                <option>IL</option>
                <option>IN</option>
                <option>IA</option>
                <option>KS</option>
                <option>KY</option>
                <option>LA</option>
                <option>ME</option>
                <option>MD</option>
                <option>MA</option>
                <option>MI</option>
                <option>MN</option>
                <option>MS</option>
                <option>MO</option>
                <option>MT</option>
                <option>NE</option>
                <option>NV</option>
                <option>NH</option>
                <option>NJ</option>
                <option>NM</option>
                <option>NY</option>
                <option>NC</option>
                <option>ND</option>
                <option>OH</option>
                <option>OK</option>
                <option>OR</option>
                <option>PA</option>
                <option>PR</option>
                <option>RI</option>
                <option>SC</option>
                <option>SD</option>
                <option>TN</option>
                <option>TX</option>
                <option>UT</option>
                <option>VT</option>
                <option>VA</option>
                <option>WA</option>
                <option>WV</option>
                <option>WI</option>
                <option>WY</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="zipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="number" onChange={this.handleChange} value={this.state.zipCode} required />
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" onChange={this.handleChange} value={this.state.country} required />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="number" onChange={this.handleChange} value={this.state.phone} required />
            </Form.Group>
            <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
    );
  }
}

export default UserForm;
