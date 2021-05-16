import React, { useState, useEffect } from "react";
import Axios from "axios";
import ImageCatalog from '../assets/imageCatalog';

function UserInv () {
    const [userInv, setUserInv] = useState([]);
    
    useEffect(() => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "/api/getUserInventory",
            }).then((res) => {
                console.log(res.data)
                setUserInv(res.data)
            });
    }, []);

    return (
        <div className="user-inv-container">
           <span>
                <div>USER ITEM INVENTORY</div>
            </span>
            <div>
                { userInv.length !== 0 ? 
                    <div>
                        <div className='user-inv-card'>
                            <span style={{paddingLeft: '30%'}}>item</span>
                            <span style={{paddingRight: '22%'}}>quantity</span>
                        </div>
                        {userInv.map((item) => (
                            <div key={item[0]} className='user-inv-card'>
                                <img style={{"height": '70px'}}
                                    src={`/images/${ImageCatalog[`${item[1]}`]}`}
                                />
                                <span>{item[5] + " "}</span>

                                <span>{item[3] + " "}</span>
                                <span><button>sell</button></span>
                            </div>
                        ))} 
                    </div> :
                    <div> You don't have anything in your inventory </div>
                }
            </div>
        </div>
    );
}

export default UserInv;
