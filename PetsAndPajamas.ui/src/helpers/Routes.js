import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutUs from '../views/AboutUs';
import Cart from '../views/Cart';
import CatStore from '../views/CatStore';
import Checkout from '../views/Checkout';
import DogStore from '../views/DogStore';
import Home from '../views/Home';
import ProductDetail from '../views/ProductDetail';
import ProfilePage from '../views/ProfilePage';
import SearchResults from '../views/SearchResults';

class Routes extends Component {
  render() {
    const { user } = this.props;

    return (
            <Switch>
                <Route exact path='/about' component={() => <AboutUs />} />
                <Route exact path='/cart' component={() => <Cart userId={user.uid} />} />
                <Route exact path='/cat-store' component={() => <CatStore />} />
                <Route exact path='/checkout' component={() => <Checkout userId={user.uid}/>} />
                <Route exact path='/dog-store' component={() => <DogStore />} />
                <Route exact path='/' component={() => <Home />} />
                <Route exact path='/product-detail/:id' component={(props) => <ProductDetail userId={user.uid}{...props} user={user}/>} />
                <Route exact path='/profile-page' component={() => <ProfilePage />} />
                <Route exact path='/search/:term' component={(props) => <SearchResults {...props}/>} />
            </Switch>
    );
  }
}

export default Routes;
