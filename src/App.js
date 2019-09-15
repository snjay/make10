import React, {Component} from 'react';
import {Route, Router, Switch} from "react-router-dom";
import history from './history'
import Numbers from "./app/views/Numbers";
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" component={Numbers}/>
        </Switch>
      </Router>
    )
  }
}
