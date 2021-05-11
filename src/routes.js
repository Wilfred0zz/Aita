import React, { Component, useContext } from 'react'
import logo from './logo.svg';
import './App.css';
import{ BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Regiser from './components/register/register';

import Home from './components/main_page/home';
import ProtectedRoute from './components/protectedRoute';
import AppContext from './appContext';

const App = () => {
    const Auth = useContext(AppContext);
    const RegisterComponent = () => <Regiser/>
    const HomeComponent = () => <Home/>
    
    return(
      <Switch>
        <Route path='/' exact component={RegisterComponent}></Route>
        <Route path='/register' exact component={RegisterComponent}></Route>
        <ProtectedRoute path='/home' auth={Auth.auth} component={HomeComponent}></ProtectedRoute>
      </Switch>
    )
}


export default App;
