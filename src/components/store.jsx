import React, { useState, useEffect } from "react";
import Axios from "axios";
import ImageCatalog from '../assets/imageCatalog';
import Button from '@material-ui/core/Button';

function Store () {
    const [storeItems, setStoreItems] = useState([]);
    const initArrItems = new Array(30);
    initArrItems.fill(1);
    const [arrItems, setArrItems] = useState(initArrItems);
    
    useEffect(() => {
        Axios({
            method: "GET",
            url: "/api/getStoreItems",
            }).then((res) => {
                console.log(res)
                setStoreItems(res.data)
            });
    }, []);

    const increment = (index) => {
        arrItems[index] = arrItems[index] + 1;
        setArrItems([...arrItems]);
    };
    
    //Create handleDecrement event handler
    const decrement = (index) => {
        if(arrItems[index] > 1){
            arrItems[index] = arrItems[index] - 1;
            setArrItems([...arrItems]);
        }
    };

    const buyItem = (itemId, quantity) => {
        console.log('itemId:' + itemId + ' quantity: ' + quantity)
        Axios({
          method: "POST",
          data: {
            itemId: itemId,
            quantity: quantity
          },
          //withCredentials: true,
          url: "/api/buyItem",
        }).then((res) => {
          console.log(res)
        }).catch(error => {
            console.log(error.response);
        });
    };

    return (
        <div className="store-container">
            <div className="store-container row">
                {storeItems.map((item) => (
                    <section key={item[0]} className='store-card-item'>
                        <img alt='store-item' style={{"height": '60px'}}
                            src={`/images/${ImageCatalog[`${item[0]}`]}`}
                        />
                        <div>{item[1]}</div>
                        <div>${item[2]}</div>
                        <div>{item[3]}</div>
                        <div>{item[4]}</div>
                        <span>
                            <button style={{margin:'.5em'}} onClick={(e)=> decrement(item[0])}>-</button>
                            {arrItems[item[0]]}
                            <button style={{margin:'.5em'}} onClick={(e)=> increment(item[0])}>+</button>
                        </span>
                        <button onClick={(e) => buyItem(item[0], arrItems[item[0]])}>buy</button> 
                    </section>
                ))}
            </div>
        </div>
    );
}

export default Store;
