import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AboutUs from '../views/AboutUs';
import Cart from '../views/Cart';
import CatStore from '../views/CatStore';
import Checkout from '../views/Checkout';
import CheckoutConfirmation from '../views/CheckoutConfirmation';
import DogStore from '../views/DogStore';
import Home from '../views/Home';
import ProductDetail from '../views/ProductDetail';
import ProfilePage from '../views/ProfilePage';
import SearchResults from '../views/SearchResults';
import AdminDashboard from '../views/AdminDashboard';

class Routes extends Component {
  PrivateRoute = ({ user, ...rest }) => {
    const routeChecker = (route) => (user && this.props.realUser.admin === true
      ? (<Component {...route} user={user} />)
      : (<Redirect to={{ pathname: '/', state: { from: route.location } }} />));

    return <Route {...rest} render={(props) => routeChecker(props) } />;
  }

  render() {
    const { user } = this.props;

    return (
            <Switch>
                <Route exact path='/about' component={() => <AboutUs />} />
                <Route exact path='/cart' component={() => <Cart userId={user.uid} />} />
                <Route exact path='/cat-store' component={() => <CatStore />} />
                <Route exact path='/checkout' component={(props) => <Checkout userId={user.uid} {...props} />} />
                <Route exact path='/dog-store' component={() => <DogStore />} />
                <Route exact path='/' component={() => <Home />} />
                <Route exact path='/product-detail/:id' component={(props) => <ProductDetail userId={user.uid}{...props} user={user}/>} />
                <Route exact path='/profile-page' component={() => <ProfilePage />} />
                <Route exact path='/search/:term' component={(props) => <SearchResults {...props}/>} />
                <this.PrivateRoute exact path='/admin-dashboard' component={AdminDashboard} user={user} />
                <Route exact path='/checkout/confirmation' component={(props) => <CheckoutConfirmation userId={user.uid} {...props} />}/>
            </Switch>
    );
  }
}

export default Routes;
