import React, {useState,useEffect} from 'react';
import { Card } from '../components/card/card';
import {Signup} from '../components/Login/signup';

export const Page = () => {

    const [todo, setTodo] = useState([])
    const[singUp, setsignUp] = useState('')

    useEffect(()=>{
        fetch('/api').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setTodo(data))
    },[])

    const handleFormChange =(inputValue) =>{
        setsignUp(inputValue)
        console.log(singUp)
    }

    const handleFormSubmit = () => {
        fetch('/api/create',{
            method:'POST',
            body:JSON.stringify({
                username:todo
            }),
            headers:{
                "username-type" : "application/json; charset = UTF-8"
            }
        }) .then (response => response.json())
            .then(message => console.log(message))
            setsignUp('')
    }

    return(
        <div>
            <Signup userInput={singUp} onFormChange = {handleFormChange} onFormSubmit= {handleFormSubmit}/>
            <Card listOfUsers={todo}/>
        </div>
    )
}