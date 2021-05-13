import React, { Component, useState, useCallback, createRef } from 'react';
import Axios from "axios";
import Modal from './../modal/Modal';

function Home (){
    const [open, setOpen] = useState(false);
    const [modalSelected, setModalSelected] = useState('')

    const toggleDialog = useCallback(() => {
        setOpen(!open);
      }, [open]);

    const testing = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://127.0.0.1:5000/api/test",
        }).then((res) => {
           console.log(res)
        });
    };

    return(
        <div>
            <div>home</div>

            <Modal modalSelected={'store'}/>
            <Modal modalSelected={'inventory'}/>

        </div>
    )
}

export default Home;