import React, { useState, useEffect } from "react";
import Axios from "axios";
import Grid from '@material-ui/core/Grid';
import ImageCatalog from '../assets/imageCatalog';

function Store (props) {
    const [storeItems, setStoreItems] = useState([]);
    
    useEffect(() => {
        Axios({
            method: "GET",
            url: "http://127.0.0.1:5000/api/getStoreItems",
            }).then((res) => {
                console.log(res)
                setStoreItems(res.data)
            });
    }, []);

    return (
        <div className="store-container">
            <span>
                <div>STORE</div>
            </span>
            <div className="store-container row">
                {storeItems.map((item) => (
                    <section key={item[0]} className='store-card-item'>
                        <img style={{"height": '50px'}}
                            src={`/images/${ImageCatalog[`${item[0]}`]}`}
                        />
                        <div>{item[1]}</div>
                        <div>{item[3]}</div>
                        <div>{item[4]}</div>
                        <button>buy</button>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default Store;
