import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import{
  BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Regiser from './components/register/register';

class App extends Component{
  render(){
    
    const RegisterComponent = () => <Regiser/>
    
    return (
      <div className="App">
          <Switch>
            <Route exact path="/register"render= {RegisterComponent}/>
          </Switch>
      </div>
    );
  }
}

export default App;
