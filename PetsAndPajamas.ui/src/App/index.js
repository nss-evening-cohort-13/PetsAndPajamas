/* eslint-disable import/extensions */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import Routes from '../helpers/Routes';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/Footer';
import fbConnection from '../helpers/data/connection';

fbConnection();

class App extends React.Component {
    state = {
      user: ''
    };

    componentDidMount() {
      this.removeListener = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((token) => sessionStorage.setItem('token', token));
          this.setState({ user });
        } else {
          this.setState({ user: false });
        }
      });
    }

    componentWillUnmount() {
      this.removeListener();
    }

    render() {
      return (
      <div className="App">
        <Router>
        <MyNavbar />
          <Routes user={this.state.user} />
        <MyFooter />
        </Router>
      </div>
      );
    }
}

export default App;
