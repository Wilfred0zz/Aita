import React, { useState } from "react";
import Axios from "axios";
import { useContext } from 'react';
import AppContext from '../../appContext';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'; 

function Register () {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
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

  return (
    <div className="base-container">
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src={`/images/plant.svg`} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username" 
            onChange={(e) => setRegisterUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" name="password" placeholder="password" 
            onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input type="text" name="password" placeholder="password" />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn"
        onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}
export default Register;