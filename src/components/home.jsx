import React, { useState, useCallback } from 'react';
import Plants from './plant';
import Navbar from './navBar';

function Home (){
    return(
        <div className='home-container'>
            <Navbar/>
            <div className='home-label'>home</div>
                <section className='home-container-content'>
                    <div className='left-home-container'>
                        <div>plant container</div>
                        <Plants/>
                    </div>
                    <div className='right-home-container'>have a description explaining the game</div>
                </section>
        </div>
    )
}

export default Home;