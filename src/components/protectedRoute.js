// import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
  } from "react-router-dom";
  
  const ProtectedRoute = ({auth, component: Component, ...rest}) => {
      return(
          <Route
          {...rest}
          render={()=> auth ? (
          <Component/>
          ):(
          <Redirect to='/'/>
          )
      }
          />
      )
  }
    
  export default ProtectedRoute;