import React, { Component, useContext } from 'react'
import logo from './logo.svg';
// import './App.css';
import{ BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from './components/protectedRoute';
import AppContext from './appContext';

import Regiser from './components/register/register';
import Home from './components/main_page/home';
import Public from './components/register/public';

const App = () => {
    const Auth = useContext(AppContext);
    const RegisterComponent = () => <Regiser/>
    const HomeComponent = () => <Home/>
    const PublicComponent = () => <Public/>
    
    return(
      <Switch>
        <Route path='/' exact component={PublicComponent}></Route>
        <Route path='/register' exact component={RegisterComponent}></Route>
        <ProtectedRoute path='/home' auth={Auth.auth} component={HomeComponent}></ProtectedRoute>
      </Switch>
    )
}


export default App;
