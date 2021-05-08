import React from 'react'
import logo from './logo.svg';
import './App.css';
import {Page} from "./Pages/Page"
import{
  BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path='/'>
          <Page/>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
