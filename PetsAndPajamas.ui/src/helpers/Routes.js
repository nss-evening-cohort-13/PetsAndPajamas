import React from 'react';
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
import AdminProducts from '../views/AdminProducts';
import Orders from '../views/Orders';
import OrderHistory from '../views/OrderHistory';

export default function Routes({ user, realUser }) {
  return (
            <Switch>
                <Route exact path='/about' component={() => <AboutUs />} />
                <PrivateRoute exact path='/cart' component={Cart} userId={user.uid} user={user} />
                <Route exact path='/cat-store' component={() => <CatStore />} />
                <PrivateRoute exact path='/checkout' component={Checkout} userId={user.uid} user={user} />
                <Route exact path='/dog-store' component={() => <DogStore />} />
                <Route exact path='/' component={() => <Home />} />
                <PrivateRoute exact path='/order-history' component={OrderHistory} user={user} />
                <Route exact path='/product-detail/:id' component={(props) => <ProductDetail userId={user.uid}{...props} user={user}/>} />
                <PrivateRoute exact path='/profile-page' component={ProfilePage} user={user} />
                <Route exact path='/search/:term' component={(props) => <SearchResults {...props}/>} />
                <AdminRoute exact path='/admin-products' component={AdminProducts} user={user} realUser={realUser} />
                <AdminRoute exact path='/admin-order' component={Orders} user={user} realUser={realUser} />
                <Route exact path='/checkout/confirmation' component={(props) => <CheckoutConfirmation userId={user.uid} {...props} />}/>
            </Switch>
  );
}

const AdminRoute = ({
  component: Component, user, realUser, ...rest
}) => {
  const routeChecker = (route) => ((user && realUser.admin === true)
    ? (<Component {...route} user={user} />)
    : (<h1>401</h1>));

  return <Route {...rest} render={(props) => routeChecker(props) } />;
};

const PrivateRoute = ({
  component: Component, user, userId, realUser, ...rest
}) => {
  const routeChecker = (route) => ((user || userId)
    ? (<Component {...route} user={user} userId={userId} />)
    : (<Redirect to={{ pathname: '/', state: { from: route.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props) } />;
};
