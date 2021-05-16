import React, { useState, useEffect } from "react";
import Axios from "axios";
import Grid from '@material-ui/core/Grid';
import ImageCatalog from '../assets/imageCatalog';

function Transactions () {
    const [plantTrans, setPlantTrans] = useState([]);
    const [itemTrans, setItemTrans] = useState([]);
    
    useEffect(() => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "/api/getPlantTrans",
            }).then((res) => {
                console.log(res.data)
                setPlantTrans(res.data)
            });
    }, []);

    return (
        <div className="transactions-container">
            <span>
                <div>PLANT TRANSACTIONS</div>
            </span>
            <div>
                { plantTrans.length !== 0 ? 
                    <div>
                        {plantTrans.map((item) => (
                            <section key={item[0]}>
                                <span>{item[1] + " "}</span>
                                <span>{item[2] + " "}</span>
                                <span>{item[3] + " "}</span>
                                <span>{item[4]}</span>
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
