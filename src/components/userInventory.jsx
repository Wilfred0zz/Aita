import React, { useState, useEffect } from "react";
import Axios from "axios";

function UserInv () {
    const [userInv, setUserInv] = useState([]);
    
    useEffect(() => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://127.0.0.1:5000/api/getUserInventory",
            }).then((res) => {
                console.log(res)
            });
    }, []);

    return (
        <div className="user-inv-container">
           THIS IS INVENTORY
        </div>
    );
}

export default UserInv;
