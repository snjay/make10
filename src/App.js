import React, {Component} from 'react';
import './App.css';
import Numbers from "./app/views/Numbers";
import {Route, Router, Switch} from "react-router-dom";
import history from './history'

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
