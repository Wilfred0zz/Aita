import React, { useState } from 'react';
import Axios from "axios";
import Modal from './modal/Modal';
import { useContext } from 'react';
import AppContext from '../appContext';
import { useHistory } from "react-router-dom";

function Navbar (){
    const [open, setOpen] = useState(false);
    const [modalSelected, setModalSelected] = useState('')
    const history = useHistory();
    const Auth = useContext(AppContext);

    const logout = () => {
        Axios({
            method: "GET",
            url: "/api/logout",
        }).then((res) => {
            console.log('successfully logged out')
            Auth.setAuth(false);
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