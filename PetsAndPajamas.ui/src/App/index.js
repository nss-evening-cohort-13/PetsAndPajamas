/* eslint-disable import/extensions */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../helpers/Routes';
import MyNavbar from '../components/MyNavbar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
        <MyNavbar />
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
