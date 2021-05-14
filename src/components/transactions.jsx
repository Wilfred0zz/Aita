import React, { useState, useEffect } from "react";
import Axios from "axios";
import Grid from '@material-ui/core/Grid';
import ImageCatalog from '../assets/imageCatalog';
import mockData from './../assets/mockData';

function Transactions () {
    const [plantTrans, setPlantTrans] = useState([]);
    const [itemTrans, setItemTrans] = useState([]);
    
    useEffect(() => {
        setPlantTrans(mockData.plantTrans)
        setItemTrans(mockData.itemTrans)
        console.log(plantTrans)
        console.log(itemTrans)
        // setStoreItems()
        // Axios({
        //     method: "GET",
        //     url: "http://127.0.0.1:5000/api/getStoreItems",
        //     }).then((res) => {
        //         console.log(res)
        //         setStoreItems(res.data)
        //     });
    });

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
