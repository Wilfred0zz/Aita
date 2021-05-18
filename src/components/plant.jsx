import React, { useState, useEffect } from "react";
import Axios, { axios } from "axios";
import ImageCatalog from '../assets/imageCatalog';
import Moment from 'react-moment';
import moment from "moment";

function Plants () {
    const [userPlants, setUserPlants] = useState([]);
    const [plantId, setPlantId] = useState(0);
    const [dt, setDt] = useState(moment());
    const dateFormat = 'MM/DD/YYYY HH:mm';

    useEffect(() => {
        Axios({
            method: "GET",
            url: "/api/getPlants",
            }).then((res) => {
                // console.log(res)
                setUserPlants(res.data)
            });
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

    const waterPlant = (plantId, itemId) => {
        alert('plantId: ' + plantId + ' itemId: ' + itemId)
        Axios({
            method: "POST",
            data: {
                plantId: plantId,
                // itemId: itemId
            },
            withCredentials: true,
            url: "/api/water",
        }).then((res) => {
            console.log(res)
            window.location.reload();
        }).catch(error => {
            console.log(error.response);
        });
    };

    
    // useEffect(() => {
    //     // console.log(userPlants)
    //     const plantStateObj = userPlants.map(plant => {
    //         return axios.post('/api/grown', { plantId: plant[0] }).then((res) => { return JSON.stringify(res)} ).catch(err => console.log(err));
    //     })
    //     console.log(plantStateObj)
    //     Promise.all(plantStateObj);
    // }, [userPlants]);

    const stateApiCalls = () => { 
       
    }

    const updateState = () => {
        // // const axiosCall = axios.post('/api/grown', { plantId: 1 });
        // console.log(stateApiCalls())
        // axios.all(stateApiCalls()).then(res => console.log(res))
    }

    return (
        <div className="plant-container">
            <div>
                <button onClick={stateApiCalls}>dsssad</button>
                { userPlants.length !== 0 ? 
                    <div className='plant-container row'>
                        {userPlants.map((plant) => (
                            <div key={plant[0]}>
                                {
                                    plant[7] !== 1 &&
                                    <div className='plant-card'>
                                        <img alt='plant-img' style={{"height": '70px'}}
                                            src={`/images/${ImageCatalog[`${plant[1]}`]}`}
                                        />
                                        <div>{'Name: '}{plant[8] + " "}</div>
                                        <div>{'Plant Species: '}{plant[9] + " "}</div>
                                        <div>{'First time Planted: '} <Moment format={dateFormat}>{plant[3]}</Moment></div>
                                        <div>{'Last time Watered: '} <Moment format={dateFormat}>{plant[4]}</Moment></div>
                                        <div>{'time it takes to grow: ' + plant[10]}</div>
                                        <div>{'water interval: ' + plant[11]}</div>
                                        <div><span>The plant will be grown by: </span><Moment format={dateFormat} add={{ hours : plant[10]} }>{plant[3]}</Moment></div>
                                        <span>next time to water: </span><Moment format={dateFormat} add={{ hours : plant[11]} }>{plant[4]}</Moment>
                                        <div>
                                            <button onClick={(e) => waterPlant(plant[0], plant[1])}>water</button>
                                            <button onClick={(e) => sellItem(plant[0], plant[1])}>sell</button></div>
                                        {/* {dt} */}
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
