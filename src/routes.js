import React, { Component, useContext } from 'react'
import logo from './logo.svg';
// import './App.css';
import{ BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import ProtectedRoute from './components/protectedRoute';

import Regiser from './components/register/register';
import Home from './components/home';
import Public from './components/register/public';
import UserInv from './components/userInventory';

const App = () => {
    // const Auth = useContext(AppContext);
    const RegisterComponent = () => <Regiser/>
    const HomeComponent = () => <Home/>
    const PublicComponent = () => <Public/>

    return(
      <Switch>
        <Route path='/' exact component={PublicComponent}></Route>
        <Route path='/register' exact component={RegisterComponent}></Route>
        <Route path='/home' component={HomeComponent}></Route>
      </Switch>
    )
}


export default App;
