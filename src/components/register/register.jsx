import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useContext } from 'react';
import AppContext from './../../appContext';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'; 

function Public() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  const history = useHistory();
  const Auth = useContext(AppContext);
  
  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      //withCredentials: true,
      url: "http://127.0.0.1:5000/api/create",
    }).then((res) => {
      console.log(res.data)
      if (res.data === 'failed'){
        console.log('failed to register')
        history.push('/')
      } else {
        console.log('successfully registered, please login')
        // Cookies.set(res.data[0], 'loginTrue')
        // Auth.setAuth(true);
        history.push('/')
      }
    });
  };

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
      if (res.data === 'failed'){
        console.log('failed to login')
        history.push('/')
      } else {
        console.log('successfully logged in')
        Cookies.set(res.data[0], 'loginTrue')
        Auth.setAuth(true);
        history.push('/home')
      }
    });
  };

  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  return (
    <div className="public-container">
      <div>Public</div>
      <div>
      <h1>Register</h1>
      <input
        placeholder="username"
        onChange={(e) => setRegisterUsername(e.target.value)}
      />
      <input
        placeholder="password"
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <button onClick={register}>Submit</button>
    </div>

    <div>
      <h1>Login</h1>
      <input
        placeholder="username"
        onChange={(e) => setLoginUsername(e.target.value)}
      />
      <input
        placeholder="password"
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={login}>Submit</button>
    </div>

    <div>
      <h1>Get User</h1>
      <button onClick={getUser}>Submit</button>
      {data ? <h1>Welcome Back {data.username}</h1> : null}
    </div>
    </div>
  );

}
export default Public;
  