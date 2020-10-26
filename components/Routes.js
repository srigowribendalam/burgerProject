import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Cart from './Cart';
import QRPage from './QRPage';

export default class Routes extends React.Component {
 
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route  path="/home" component={Home} />
        <Route  path="/cart" component={Cart} />
        <Route  path="/qrpage" component={QRPage} />
      </Switch >
    );
  };
}