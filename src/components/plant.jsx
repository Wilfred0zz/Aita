import React, { useState, useEffect } from "react";
import Axios from "axios";
import ImageCatalog from '../assets/imageCatalog';

function Plants () {
    const [userPlants, setUserPlants] = useState([]);
    const [dt, setDt] = useState(new Date().toLocaleString());

    useEffect(() => {
        Axios({
            method: "GET",
            url: "/api/getPlants",
            }).then((res) => {
                console.log(res)
                setUserPlants(res.data)
            });
    }, []);

    useEffect(() => {
        let secTimer = setInterval( () => {
          setDt(new Date().toLocaleString())
        },1000)
    
        return () => clearInterval(secTimer);
    }, []);

    return (
        <div className="plant-container">
            <div>
                { userPlants.length !== 0 ? 
                    <div className='plant-container row'>
                        {userPlants.map((plant) => (
                            <div key={plant[0]} className='plant-card'>
                                <img style={{"height": '70px'}}
                                    src={`/images/${ImageCatalog[`${plant[1]}`]}`}
                                />
                                <div>{'Name: '}{plant[8] + " "}</div>
                                <div>{'Plant Species: '}{plant[9] + " "}</div>
                                <div>{'First time Planted: '}{plant[3] + " "}</div>
                                <div>{'Last time Watered: '}{plant[4] + " "}</div>
                                {/* {dt} */}
                                <div><button>water</button><button>apply item</button><button>sell</button></div>

                            </div>
                        ))} 
                    </div> :
                    <div> You have not planted any plants yet! </div>
                }
            </div>
        </div>
    );
}

export default Plants;
