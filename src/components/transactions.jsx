import React, { useState, useEffect } from "react";
import Axios from "axios";
import ImageCatalog from '../assets/imageCatalog';

function Transactions () {
    const [itemTrans, setItemTrans] = useState([]);
    
    useEffect(() => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "/api/getItemTrans",
            }).then((res) => {
                console.log(res.data)
                setItemTrans(res.data)
            });
    }, []);

    return (
        <div className="card-container">
            <div>
                { itemTrans.length !== 0 ? 
                    <div>
                        {itemTrans.map((item) => (
                            <section key={item[0]} className='card'>
                                <img style={{"height": '60px'}}
                                    src={`/images/${ImageCatalog[`${item[3]}`]}`}
                                />
                                <span>{'Bought ' + item[2] + " " + item[5] + ' on ' + item[4] + ' for ' + item[7]}</span>
                            </section>
                        ))} 
                    </div> :
                    <div> You have not sold any plants yet </div>
                }
            </div>
        </div>
    );
}

export default Transactions;
