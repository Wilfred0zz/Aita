import React, { useState, useEffect } from "react";
import Axios from "axios";

function UserInv () {
    const [userProf, setUserProf] = useState([]);
    
    useEffect(() => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "/api/getProfile",
            }).then((res) => {
                console.log(res.data)
                setUserProf(res.data)
            });
    }, []);

    return (
        <div className="prof-container">
            <img style={{height:'200px'}} src='/images/profile.svg'/>
            <div>
                { userProf.length !== 0 ? 
                    <div className='prof-cont'>
                        {userProf.map((item) => (
                            <div key={item[0]}>
                                <div> {'Username: '}{item[1]} </div>
                                <div> {'Balance: '}{item[2]} </div>
                                <div> {'Number of plants sold: '}{item[3]} </div>
                            </div>
                        ))} 
                    </div> :
                    <div> Error Finding Profile </div>
                }
            </div>
        </div>
    );
}

export default UserInv;
