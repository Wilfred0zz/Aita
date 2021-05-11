import React, { Component } from 'react';
import Axios from "axios";

function Home (){
    const testing = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://127.0.0.1:5000/api/test",
        }).then((res) => {
           console.log(res)
        });
    };

    return(
        <div>
            <div>home</div>
            <button onClick={testing}>Submit</button>
        </div>
    )
}

export default Home;