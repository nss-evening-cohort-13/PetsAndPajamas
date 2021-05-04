import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminDashboard extends Component {
  state = { }

  render() {
    return (
      <div>
      <h1>Admin Dashboard</h1>
      <Link to='/'></Link>
      </div>
    );
  }
}

export default AdminDashboard;
