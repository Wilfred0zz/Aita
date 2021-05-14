import React, { useState, useEffect } from "react";
import Axios from "axios";

function UserInv () {
    const [userInv, setUserInv] = useState([]);

    const getInv = () => {
        Axios({
            method: "GET",
            // withCredentials: false,
            url: "http://127.0.0.1:5000/api/getUserInventory",
            }).then((res) => {
                console.log(res)
            });
    }

    return (
        <div className="user-inv-container">
           <button onClick={getInv}> press to get user Inv</button>
        </div>
    );
}

export default UserInv;