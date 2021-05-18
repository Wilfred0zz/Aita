import React from 'react'
// import './App.css';
import{ BrowserRouter as Switch, Route } from "react-router-dom";
// import ProtectedRoute from './components/protectedRoute';

import Regiser from './components/register/register';
import Home from './components/home';
import Public from './components/register/public';

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
