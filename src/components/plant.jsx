import React, { useState, useEffect } from "react";
import Axios from "axios";
import ImageCatalog from '../assets/imageCatalog';
import Moment from 'react-moment';

function Plants () {
    const [userPlants, setUserPlants] = useState([]);
    const [plantId, setPlantId] = useState(0);
    const [dt, setDt] = useState(new Date().toLocaleString());
    const dateFormat = 'MM/DD/YYYY HH:mm';

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

    const sellItem = (plantId, itemId) => {
        alert('plantId: ' + plantId + ' itemId: ' + itemId)
        Axios({
            method: "POST",
            data: {
                plantId: plantId,
                itemId: itemId
            },
            //withCredentials: true,
            url: "/api/sellPlant",
        }).then((res) => {
            console.log(res)
            window.location.reload();
        }).catch(error => {
            console.log(error.response);
        });
      };

    return (
        <div className="plant-container">
            <div>
                { userPlants.length !== 0 ? 
                    <div className='plant-container row'>
                        {userPlants.map((plant) => (
                            <div key={plant[0]}>
                                {
                                    plant[7] != 1 &&
                                    <div className='plant-card'>
                                        <img style={{"height": '70px'}}
                                            src={`/images/${ImageCatalog[`${plant[1]}`]}`}
                                        />
                                        <div>{'Name: '}{plant[8] + " "}</div>
                                        <div>{'Plant Species: '}{plant[9] + " "}</div>
                                        <div>{'First time Planted: '} <Moment format={dateFormat}>{plant[3]}</Moment></div>
                                        <div>{'Last time Watered: '} <Moment format={dateFormat}>{plant[4]}</Moment></div>
                                        <div>{'time it takes to grow: ' + plant[10]}</div>
                                        <div>{'water interval: ' + plant[11]}</div>
                                        <div><span>The plant will be grown by: </span><Moment format={dateFormat} add={{ hours : plant[10]} }>{plant[3]}</Moment></div>
                                        <span>next time to water: </span><Moment format={dateFormat} add={{ hours : plant[11]}}>{plant[4]}</Moment>
                                        <div><button>water</button><button onClick={(e) => sellItem(plant[0], plant[1])}>sell</button></div>
                                    </div>
                                }
                                
                                

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
