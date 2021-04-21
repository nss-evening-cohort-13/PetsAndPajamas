import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <h2>Pets And Pajamas</h2>
      </div>
    );
  }
}

export default App;
