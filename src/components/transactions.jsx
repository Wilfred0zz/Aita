import React, { useState, useEffect } from "react";
import Axios from "axios";
import ImageCatalog from '../assets/imageCatalog';
import moment from "moment";

function Transactions () {
    const [itemTrans, setItemTrans] = useState([]);
    const dateFormat = "MM/DD/YYYY HH:mm";
    
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
                                <img alt='item-trans' style={{"height": '60px'}}
                                    src={`/images/${ImageCatalog[`${item[3]}`]}`}
                                />
                                {
                                    item[2] > 1 ? (
                                        <span>{'Bought ' + item[2] + " " + item[5] + 's on ' + moment(item[4]).format(dateFormat) + ' for $' + item[7]}</span>
                                    ):(
                                        <span>{'Bought ' + item[2] + " " + item[5] + ' on ' + moment(item[4]).format(dateFormat) + ' for $' + item[7]}</span>
                                    )
                                }
                                
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
