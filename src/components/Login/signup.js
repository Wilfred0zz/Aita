import React from 'react';


export const Signup = ({userInput,onFormChange, onFormSubmit})=> {
    const handleChange = (event) =>{
        onFormChange(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }
    return(
        <>
            <form onSubmit = {handleSubmit}>
                <label>Username: </label>
                <input type='text' required value={userInput} onchange={handleChange}></input>
                <label> Password: </label>
                <input type='Password' required value={userInput} onchange={handleChange}></input>
                <input type = 'submit' required></input>
            </form>
        </>
    )
}