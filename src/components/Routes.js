import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

export default class Routes extends React.Component {
 
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
       <Route  path="/home" component={Home} />
      </Switch >
    );
  };
}