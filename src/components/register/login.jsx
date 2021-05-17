import React, { useState } from "react";
import Axios from "axios";
import { useContext } from 'react';
import AppContext from '../../appContext';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import AlertHandler from './../alert';

function Login () {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const Auth = useContext(AppContext);
  // 4 seconds?
  const duration = 3500;
  const [visible, setAlertVisibility] = useState(false);

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      //withCredentials: true,
      url: "/api/setcookie",
    }).then((res) => {
      console.log(res)
      if (res.data === 'failed'){
        console.log('failed to login')
        history.push('/')
        setAlertVisibility(true)

      } else {
        console.log('successfully logged in')
        Auth.setAuth(true);
        history.push('/home')
      }
    });
  };

  return (
    <div className="base-container">
        <AlertHandler
          visible={visible}
          duration={duration}
          onDurationEnd={setAlertVisibility}
        >
          <Alert severity='error'> You're login info is incorrect </Alert>
        </AlertHandler>
      <div className="LR-header">Login</div>
      <div className="LR-content">
        <div className="LR-image-cnt">
          <img className='LR-img' src={`/images/plant.svg`} />
        </div>
        <div className="LR-form">
          <div className="LR-form-group">
            <label className='LR-label' htmlFor="username">Username</label>
            <input className='LR-input' type="text" name="username" placeholder="username" 
            onChange={(e) => setLoginUsername(e.target.value)}
            />
          </div>
          <div className="LR-form-group">
            <label className='LR-label' htmlFor="password">Password</label>
            <input className='LR-input' type="password" name="password" placeholder="password" 
            onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="LR-footer">
        <button type="button" className="btn"
        onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
export default Login;
