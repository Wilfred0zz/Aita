import React from 'react';
import Axios from "axios";
import Modal from './modal/Modal';
import { useHistory } from "react-router-dom";

function Navbar (){
    const history = useHistory();

    const logout = () => {
        Axios({
            method: "GET",
            url: "/api/logout",
        }).then((res) => {
            console.log('successfully logged out')
            history.push('/')
        });
    };

    return(
        <div className='nav-container'>
            <div 
                style={{paddingLeft:'2em'}}
                className='aita'>
                    Aita
            </div>
            <Modal modalSelected={'Store'}/>
            <Modal modalSelected={'Inventory'}/>
            <Modal modalSelected={'Transactions'}/>
            <Modal modalSelected={'Profile'}/>
            <div>
                <li className='nav-options' 
                style={{paddingRight:'2.5em'}}
                onClick={logout}>
                    logout
                </li>
            </div>
        </div>
    )
}

export default Navbar;