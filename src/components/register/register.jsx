import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom"; 
import Alert from '@material-ui/lab/Alert';
import AlertHandler from './../alert';

function Register () {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [open, setOpen] = React.useState(true);
  const duration = 3500;
  const [visible, setAlertVisibility] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      //withCredentials: true,
      url: "api/create",
    }).then((res) => {
      console.log(res.data)
      if (res.data === 'failed'){
        console.log('failed to register')
        setAlertVisibility(true)
      } else {
        console.log('successfully registered, please login')
        setIsSuccess(true)
        setAlertVisibility(true)
        setTimeout(() => { window.location.reload(); }, 2000);
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
          {
            isSuccess ?
            <Alert severity='success'> You have successfully registered! We'll redirect you back to the login page. Please login. </Alert>
            : <Alert severity='error'> Unable to register, try a different username </Alert>
          }   
      </AlertHandler>
      <div className="LR-header">Register</div>
      <div className="LR-content">
        <div className="LR-image-cnt">
          <img alt='register-img' className='LR-img' src={`/images/plant.svg`} />
        </div>
        <div className="LR-form">
          <div className="LR-form-group">
            <label className='LR-label' htmlFor="username">Username</label>
            <input className='LR-input' type="text" name="username" placeholder="username" 
            onChange={(e) => setRegisterUsername(e.target.value)}
            />
          </div>
          <div className="LR-form-group">
            <label className='LR-label' htmlFor="password">Password</label>
            <input className='LR-input' type="text" name="password" placeholder="password" 
            onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </div>
          <div className="LR-form-group">
            <label className='LR-label' htmlFor="password">Confirm Password</label>
            <input className='LR-input' type="text" name="password" placeholder="password" />
          </div>
        </div>
      </div>
      <div className="LR-footer">
        <button type="button" className="btn"
        onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}
export default Register;