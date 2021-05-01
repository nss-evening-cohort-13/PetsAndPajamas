import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import moment from 'moment-timezone';
import axios from 'axios';
import { baseUrl } from '../../helpers/config.json';
import customerOrderData from '../../helpers/data/customerOrderData';

class Auth extends Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((cred) => {
      const user = cred.additionalUserInfo.profile;
      if (cred.additionalUserInfo.isNewUser) {
        // get uid from firebase, the rest of this info is just made up, whatever registration information you're already saving to the database
        const userInfo = {
          firebaseid: cred.user.uid,
          firstname: user.given_name,
          lastname: user.family_name,
          emailaddress: user.email,
          admin: false,
          isactive: true
          // cred here is the created, logged in user from firebase
        };
        // save the user to the the api
        axios.post(`${baseUrl}/siteusers`, userInfo).then((response) => {
          const date = moment(Date.now());
          const orderInfo = {
            UserId: response.data.id,
            OrderDate: date.tz('America/Chicago').format(),
            ShipDate: date.add(2, 'days').tz('America/Chicago').format(),
            TotalCost: 0.00,
            IsCompleted: false
          };
          customerOrderData.createCustomerOrder(orderInfo);
        });
      }
    });
  };

  logoutClickEvent = () => {
    firebase.auth().signOut();
  }

  renderAuthBtn = () => {
    const user = firebase.auth().currentUser;
    let authBtn;
    if (user) {
      authBtn = <button className='btn btn-secondary mt-2' onClick={this.logoutClickEvent}>
          Logout
        </button>;
    } else {
      authBtn = <button className='btn btn-secondary mt-2' onClick={this.loginClickEvent}>
          Login
        </button>;
    }
    return authBtn;
  }

  render() {
    return (
      <div className='Auth'>
        {this.renderAuthBtn()}
      </div>
    );
  }
}

export default Auth;
