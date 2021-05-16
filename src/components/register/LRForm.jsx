import React, { useEffect, useState, useRef } from "react";
import Login from "./login";
import Register from './register';

function LRForm () {
  const [isLogin, setIsLogin] = useState(true);
  const buttonDisplay = isLogin ? "register" : "login";
  const rightSideRef = useRef(null);

  const RightSide = () => {
    return (
    <div onClick={() => changeState(isLogin)}
      className="right-side"
      ref={rightSideRef}
    > 
        <div className="inner-container">
          <div className="text">{buttonDisplay} </div>
        </div>
    </div>
    );
  };

  useEffect(() => {
    const rightSideNode = rightSideRef.current
    // console.log(rightSideNode.classList)
    if(isLogin){
      rightSideNode.classList.remove("right");
      rightSideNode.classList.add("left");
    } else {
      rightSideNode.classList.remove("left");
      rightSideNode.classList.add("right");
    }
  });


  const changeState = (isLogin) => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="login-container">
      <div className="login">
        <div className="container">
          {isLogin && (
            <Login/>
          )}
          {!isLogin && (
            <Register/>
          )}
        </div>
        <RightSide/>
      </div>
    </div>
  );
  
}


export default LRForm;
