import React, { useState, useEffect } from "react";
import Axios from "axios";
import ImageCatalog from '../assets/imageCatalog';
import Modal from '@material-ui/core/Modal';

function NewPlant () {
    const [userInv, setUserInv] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [seedId, setSeedId] = useState(0);
    const [seedType, setSeedType] = useState('');
    const [plantName, setPlantName] = useState('');
    
    const handleOpen = (seedId, seedType) => {
        // alert(itemId);
        setSeedId(seedId);
        setSeedType(seedType);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={{background: 'white'}}>
                <img alt='new-plant-img' style={{"height": '70px'}}
                src={`/images/${ImageCatalog[`${seedId}`]}`}
            />
            <div> Confirm to plant {seedType} </div>
            <div> What would you like to name it? </div> <input onChange={e => setPlantName(e.target.value)} ></input>
            <button onClick={(e) => plantSeed(seedId, plantName)}>Plant it!</button>
        </div>
    );

    const plantSeed = (itemId, plantName) => {
        console.log('itemId: ' + itemId + ' name: ' + plantName)
        Axios({
          method: "POST",
          data: {
            itemId: itemId,
            plantName: plantName
          },
          //withCredentials: true,
          url: "/api/plantSeed",
        }).then((res) => {
          console.log(res)
          window.location.reload();
        }).catch(error => {
            console.log(error.response);
        });
    };

    useEffect(() => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "/api/getUserInventory",
            }).then((res) => {
                console.log(res.data)
                setUserInv(res.data)
            });
    }, []);

    return (
        <div className="card-container">
           <span>
                <div>Which plant do you want to plant?</div>
            </span>
            <div>
                { userInv.length !== 0 ? 
                    <div>
                        <div className='card'>
                            <span style={{paddingLeft: '30%'}}>item</span>
                            <span style={{paddingRight: '22%'}}>quantity</span>
                        </div>
                        {userInv.map((item) => (
                            <div key={item[0]}>
                                {/* we do not render pots, soil, or water because we can't plant them */}
                                {
                                    item[1] !== 1 && item[1] !== 2 && item[1] !== 3 &&
                                    <div className='card'>
                                        <img alt='seeds-img' style={{"height": '70px'}}
                                            src={`/images/${ImageCatalog[`${item[1]}`]}`}
                                        />
                                        <span>{item[4] + " "}</span>
                                        <span>{item[3] + " "}</span>
                                        <span><button onClick={(e) => handleOpen(item[1], item[4])}>plant</button></span>
                                    </div>
                                }
     
                            </div>
                        ))} 
                    </div> :
                    <div> You don't have anything in your inventory </div>
                }
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    
                    {body}
                </Modal>
            </div>
        </div>
    );
}

export default NewPlant;
