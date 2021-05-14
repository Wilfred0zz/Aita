import React, { useState } from "react";
import Axios from "axios";
import { useContext } from 'react';
import AppContext from '../../appContext';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'; 

function Login () {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const history = useHistory();
  const Auth = useContext(AppContext);

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      //withCredentials: true,
      url: "http://127.0.0.1:5000/api/setcookie",
    }).then((res) => {
      console.log(res)
      if (res.data === 'failed'){
        console.log('failed to login')
        history.push('/')
      } else {
        console.log('successfully logged in')
        Cookies.set("userId", res.data.userId)
        Auth.setAuth(true);
        history.push('/home')
      }
    });
  };

  return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={`/images/plant.svg`} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username" 
            onChange={(e) => setLoginUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" 
            onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn"
        onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
export default Login;
