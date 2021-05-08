import React from 'react';


export const Card = ({listOfUsers}) => {
    return (
        <>
            {listOfUsers.map(todo => {
                return(
                    <ul key={todo.user_id}>
                        <li>{todo.username}</li>
                    </ul>
                )
            })}
        </>
    )
}