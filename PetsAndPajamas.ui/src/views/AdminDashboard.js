import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminDashboard extends Component {
  state = { }

  render() {
    return (
      <div>
      <h1>Admin Dashboard</h1>
      <p>Total Sales:</p>
      <p>Total This Month:</p>
      <p>Average Per Item:</p>
      <Link to='/admin-products'>Admin products</Link>
      <Link to='/admin-order'>Admin orders</Link>
      </div>
    );
  }
}

export default AdminDashboard;
